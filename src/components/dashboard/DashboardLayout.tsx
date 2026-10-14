import { useCallback, useEffect, useState } from "react";
import { Box } from "@mui/material";
import axios from "axios";
import {
  Outlet,
  useLocation,
} from "react-router-dom";

import DashboardHeader from "./DashboardHeader";
import DashboardPeriodBar from "./DashboardPeriodBar";
import DashboardNavigation from "./DashboardNavigation";
import Footer from "../layout/Footer";
import IosCodeEntry from "../auth/IosCodeEntry";

import { getToken, clearToken } from "../../utils/auth";
import { isIosStandaloneApp } from "../../utils/platform";

import {
  DashboardProvider,
  useDashboard,
} from "../../context/DashboardContext";

import {
  getDashboard,
  getProgress,
} from "../../api/dashboardApi";

/**
 * =========================================================
 * DASHBOARD CONTENT
 * =========================================================
 */

interface DashboardContentProps {
  month: number;
  week: number;
  periodResetKey: number;

  onMonthChange: (month: number) => void;
  onWeekChange: (week: number) => void;
  onAuthFailed: () => void;
}

const DashboardContent = ({
  month,
  week,
  periodResetKey,
  onMonthChange,
  onWeekChange,
  onAuthFailed,
}: DashboardContentProps) => {
  const {
    setDashboard,
    setStats,
  } = useDashboard();

  /**
   * =======================================================
   * CURRENT ROUTE
   * =======================================================
   *
   * We use the pathname so the global header statistics
   * refresh whenever the user moves between:
   *
   * Workout -> Progress
   * Progress -> Diet
   * Diet -> Workout
   *
   * The DashboardLayout stays mounted during navigation,
   * so without this dependency the stats effect would not
   * run again.
   */

  const location = useLocation();

  /**
   * =======================================================
   * LOAD DASHBOARD DATA
   * =======================================================
   */

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await getDashboard();

        if (response.success) {
          setDashboard(response.data);
        }
      } catch (error) {
        console.error(
          "Failed to load dashboard:",
          error
        );

        /**
         * In the installed iOS app, a rejected token
         * sends the user back to the code entry screen
         * instead of leaving them on an empty dashboard.
         */
        const status = axios.isAxiosError(error)
          ? error.response?.status
          : undefined;

        if (
          isIosStandaloneApp() &&
          (status === 401 || status === 403)
        ) {
          clearToken();
          onAuthFailed();
        }
      }
    };

    void loadDashboard();
  }, [setDashboard, onAuthFailed]);

  /**
   * =======================================================
   * LOAD GLOBAL DASHBOARD STATS
   * =======================================================
   *
   * The header is global, so its statistics should not
   * depend on whether Workout, Diet, or Progress happens
   * to be currently open.
   *
   * We use:
   *
   * - dashboard.days -> planned sets / planned days
   * - progress.weekly_detail -> logged/completed sets
   *
   * A day is considered LOGGED when the backend says
   * `logged: true`, even if the workout is only partially
   * completed.
   *
   * Example:
   *
   * 29 / 30 sets completed
   *
   * means:
   *
   * SETS DONE   = 29
   * DAYS LOGGED = 1
   * DAYS DONE   = 0
   */

  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      try {
        const [
          dashboardResponse,
          progressResponse,
        ] = await Promise.all([
          getDashboard(),
          getProgress(),
        ]);

        if (
          cancelled ||
          !dashboardResponse.success ||
          !progressResponse.success
        ) {
          return;
        }

        const dashboard =
          dashboardResponse.data;

        const progress =
          progressResponse.data;

        /**
         * =================================================
         * TOTAL PLANNED SETS
         * =================================================
         *
         * The dashboard contains the five workout days.
         *
         * Example:
         *
         * Day 1 -> 30
         * Day 2 -> ...
         * ...
         * Total -> 139
         */

        const totalSets =
          (dashboard.days ?? []).reduce(
            (
              total: number,
              day: any
            ) => {
              return (
                total +
                (day.exercises ?? []).reduce(
                  (
                    dayTotal: number,
                    exercise: any
                  ) => {
                    return (
                      dayTotal +
                      Number(
                        exercise.sets ?? 0
                      )
                    );
                  },
                  0
                )
              );
            },
            0
          );

        /**
         * =================================================
         * WEEKLY DETAIL
         * =================================================
         *
         * Structure from the backend:
         *
         * weekly_detail
         *   -> month
         *      -> week
         *         -> day
         */

        const monthlyDetail =
          progress.weekly_detail?.[
          String(month)
          ] ?? {};

        const weeklyDetail =
          monthlyDetail[
          String(week)
          ] ?? {};

        /**
         * =================================================
         * CALCULATE COMPLETED / LOGGED DAYS
         * =================================================
         */

        let completedSets = 0;
        let loggedDays = 0;
        let completedDays = 0;
        let calories = 0;

        Object.values(
          weeklyDetail
        ).forEach(
          (dayData: any) => {
            if (!dayData) {
              return;
            }

            /**
             * A workout counts as LOGGED as soon as
             * the backend has a logged record for it.
             *
             * This is intentionally different from
             * `completed`.
             */
            if (dayData.logged === true) {
              loggedDays += 1;
            }

            /**
             * Backend gives us the exact number of
             * completed sets.
             */
            completedSets += Number(
              dayData.completed_sets ?? 0
            );

            /**
             * A day is completed only when the entire
             * workout is complete.
             */
            if (dayData.completed === true) {
              completedDays += 1;
            }

            /**
             * Use the calories from the logged workout.
             */
            calories += Number(
              dayData.calories_burned ?? 0
            );
          }
        );

        /**
         * =================================================
         * TOTAL DAYS
         * =================================================
         */

        const totalDays =
          dashboard.days?.length ?? 0;

        /**
         * =================================================
         * UPDATE GLOBAL HEADER STATS
         * =================================================
         */

        setStats({
          completedSets,
          totalSets,
          loggedDays,
          completedDays,
          totalDays,
          calories,
        });
      } catch (error) {
        console.error(
          "Failed to load dashboard stats:",
          error
        );
      }
    };

    void loadStats();

    return () => {
      cancelled = true;
    };
  }, [
    month,
    week,
    location.pathname,
    setStats,
  ]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f5f2ed",
      }}
    >
      {/* ===================================================
          HEADER
          =================================================== */}

      <DashboardHeader />

      {/* ===================================================
          MONTH / WEEK PERIOD BAR
          =================================================== */}

      <DashboardPeriodBar
        month={month}
        week={week}
        onMonthChange={onMonthChange}
        onWeekChange={onWeekChange}
      />

      {/* ===================================================
          DASHBOARD NAVIGATION
          =================================================== */}

      <DashboardNavigation />

      {/* ===================================================
          PAGE CONTENT
          =================================================== */}

      <Box component="main">
        <Outlet
          context={{
            month,
            week,
            periodResetKey,
            onMonthChange,
            onWeekChange,
          }}
        />
      </Box>

      {/* ===================================================
          FOOTER
          =================================================== */}

      <Footer variant="dashboard" />
    </Box>
  );
};

/**
 * =========================================================
 * DASHBOARD LAYOUT
 * =========================================================
 */

const DashboardLayout = () => {
  /**
   * =======================================================
   * iOS HOME SCREEN APP CODE ENTRY
   * =======================================================
   *
   * iOS Home Screen apps don't share storage with the
   * browser, so the first launch has no token. Ask for
   * the GRIND code once instead of showing empty data.
   */

  const [
    needsCode,
    setNeedsCode,
  ] = useState(
    () => isIosStandaloneApp() && !getToken()
  );

  const handleAuthFailed = useCallback(
    () => setNeedsCode(true),
    []
  );

  /**
   * =======================================================
   * GLOBAL MONTH / WEEK
   * =======================================================
   */

  const [
    month,
    setMonth,
  ] = useState(1);

  const [
    week,
    setWeek,
  ] = useState(1);

  /**
   * =======================================================
   * PERIOD RESET KEY
   * =======================================================
   */

  const [
    periodResetKey,
    setPeriodResetKey,
  ] = useState(0);

  /**
   * =======================================================
   * MONTH CHANGE
   * =======================================================
   */

  const handleMonthChange = (
    newMonth: number
  ) => {
    setMonth(newMonth);

    setPeriodResetKey(
      (previous) =>
        previous + 1
    );
  };

  /**
   * =======================================================
   * WEEK CHANGE
   * =======================================================
   */

  const handleWeekChange = (
    newWeek: number
  ) => {
    setWeek(newWeek);

    setPeriodResetKey(
      (previous) =>
        previous + 1
    );
  };

  if (needsCode) {
    return (
      <IosCodeEntry
        onSuccess={() => setNeedsCode(false)}
      />
    );
  }

  return (
    <DashboardProvider>
      <DashboardContent
        month={month}
        week={week}
        periodResetKey={
          periodResetKey
        }
        onMonthChange={
          handleMonthChange
        }
        onWeekChange={
          handleWeekChange
        }
        onAuthFailed={
          handleAuthFailed
        }
      />
    </DashboardProvider>
  );
};

export default DashboardLayout;