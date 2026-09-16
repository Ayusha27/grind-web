import { useState } from "react";
import {
    Box,
    Container,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    Typography,
} from "@mui/material";

import EnrollmentPlans, {
    EnrollmentPlan,
} from "./EnrollmentPlans";

import EnrollmentDetails, {
    EnrollmentDetailsData,
} from "./EnrollmentDetails";

import EnrollmentExpertServices, {
    ExpertService,
} from "./EnrollmentExpertServices";
import EnrollmentFooter from "./EnrollmentFooter";
import EnrollmentNextSteps from "./EnrollmentNextSteps";
import EnrollmentReferral from "./EnrollmentReferral";
import EnrollmentSummary from "./EnrollmentSummary";
import EnrollmentTerms from "./EnrollmentTerms";
import EnrollmentSuccess from "./EnrollmentSuccess";

import {
    createPaymentOrder,
    verifyPayment,
} from "../../../api/enrollmentApi";

/* =========================================================
   RAZORPAY TYPES
   ========================================================= */

interface RazorpayPaymentResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}

interface RazorpayOptions {
    key: string;
    amount: number;
    currency: string;
    name: string;
    description: string;
    order_id: string;

    handler: (
        response: RazorpayPaymentResponse
    ) => void;

    prefill?: {
        name?: string;
        email?: string;
        contact?: string;
    };

    notes?: Record<string, string>;

    theme?: {
        color?: string;
    };

    modal?: {
        ondismiss?: () => void;
    };
}

interface RazorpayInstance {
    open: () => void;
}

interface RazorpayConstructor {
    new(
        options: RazorpayOptions
    ): RazorpayInstance;
}

declare global {
    interface Window {
        Razorpay?: RazorpayConstructor;
    }
}

/* =========================================================
   PLANS
   ========================================================= */

const plans: EnrollmentPlan[] = [
    {
        id: "3m",
        name: "3 MONTH KICKSTART",
        price: 3499,
        description:
            "A focused programme to help you build consistency and make meaningful progress.",
        features: [
            "Goal Focused Workout Programme",
            "AI Generated Nutrition Guidance",
            "Workout & Weight Tracking",
            "Access for 4 Months",
        ],
        buttonText: "ENROLL NOW",
    },
    {
        id: "6m",
        name: "6 MONTH TRANSFORMATION",
        price: 7999,
        badge: "MOST RECOMMENDED",
        description:
            "A complete transformation programme with additional support and programme flexibility.",
        features: [
            "Everything in Kickstart",
            "Lifestyle Consultation",
            "Workout Programme + 1 Variant",
            "Priority Programme Review",
            "Access for 8 Months",
        ],
        buttonText: "START TRANSFORMATION",
    },
    {
        id: "12m",
        name: "12 MONTH LIFESTYLE EVOLUTION",
        price: 12999,
        description:
            "A long-term approach designed to help you build sustainable fitness and lifestyle habits.",
        features: [
            "Everything in Transformation",
            "2 Lifestyle Consultations",
            "Workout Programme + 3 Variants",
            "Annual Transformation Roadmap",
            "Access for 15 Months",
        ],
        buttonText: "COMMIT FOR A YEAR",
    },
];

/* =========================================================
   RAZORPAY SCRIPT
   ========================================================= */

const loadRazorpayScript = (): Promise<boolean> => {
    return new Promise((resolve) => {
        if (window.Razorpay) {
            resolve(true);
            return;
        }

        const existingScript =
            document.querySelector(
                'script[src="https://checkout.razorpay.com/v1/checkout.js"]'
            );

        if (existingScript) {
            existingScript.addEventListener(
                "load",
                () => {
                    resolve(Boolean(window.Razorpay));
                }
            );

            existingScript.addEventListener(
                "error",
                () => {
                    resolve(false);
                }
            );

            return;
        }

        const script =
            document.createElement("script");

        script.src =
            "https://checkout.razorpay.com/v1/checkout.js";

        script.async = true;

        script.onload = () => {
            resolve(Boolean(window.Razorpay));
        };

        script.onerror = () => {
            resolve(false);
        };

        document.body.appendChild(script);
    });
};

/* =========================================================
   COMPONENT
   ========================================================= */

export default function Enrollment() {
    const [details, setDetails] =
        useState<EnrollmentDetailsData>({
            fullName: "",
            email: "",
            phone: "",
            acceptedTerms: false,
        });

    const [referralCode, setReferralCode] =
        useState("");

    const [discountPercent, setDiscountPercent] =
        useState(0);

    const [couponCode, setCouponCode] =
        useState("");

    const [selectedPlanId, setSelectedPlanId] =
        useState<EnrollmentPlan["id"] | null>(
            null
        );

    const [selectedServices, setSelectedServices] =
        useState<string[]>([]);

    const [errors, setErrors] = useState<{
        fullName?: string;
        email?: string;
        phone?: string;
        acceptedTerms?: string;
    }>({});

    const [loadingPlanId, setLoadingPlanId] =
        useState<string | null>(
            null
        );

    const [paymentError, setPaymentError] =
        useState("");

    const [paymentSuccess, setPaymentSuccess] =
        useState(false);

    const [programmeLink, setProgrammeLink] =
        useState("");

    const [validationDialogOpen, setValidationDialogOpen] =
        useState(false);

    const [validationDialogMessage, setValidationDialogMessage] =
        useState("");

    const selectedPlan =
        plans.find(
            (plan) =>
                plan.id === selectedPlanId
        ) ?? null;

    /* =========================================================
       VALIDATION DIALOG
    ========================================================= */

    const showValidationDialog = () => {
        const missingDetails: string[] = [];

        if (!details.fullName.trim()) {
            missingDetails.push("full name");
        }

        if (!details.email.trim()) {
            missingDetails.push("email address");
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                details.email.trim()
            )
        ) {
            missingDetails.push("valid email address");
        }

        if (!details.phone.trim()) {
            missingDetails.push("phone number");
        }

        if (!details.acceptedTerms) {
            missingDetails.push(
                "agreement to the Terms & Conditions"
            );
        }

        if (missingDetails.length === 0) {
            return;
        }

        if (
            missingDetails.length === 1 &&
            missingDetails[0] ===
            "agreement to the Terms & Conditions"
        ) {
            setValidationDialogMessage(
                "Please agree to the Terms & Conditions before continuing."
            );
        } else {
            setValidationDialogMessage(
                `Please complete your ${missingDetails
                    .filter(
                        (item) =>
                            item !==
                            "agreement to the Terms & Conditions"
                    )
                    .join(
                        ", "
                    )}${missingDetails.includes(
                        "agreement to the Terms & Conditions"
                    )
                        ? " and agree to the Terms & Conditions"
                        : ""} before continuing.`
            );
        }

        setValidationDialogOpen(true);
    };

    const closeValidationDialog = () => {
        setValidationDialogOpen(false);
    };

    /* =========================================================
       DETAILS
    ========================================================= */

    const handleDetailsChange = (
        field: keyof EnrollmentDetailsData,
        value: string | boolean
    ) => {
        setDetails((previous) => ({
            ...previous,
            [field]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [field]: undefined,
        }));

        setPaymentError("");
    };

    /* =========================================================
       REFERRAL
    ========================================================= */

    const handleReferralValidated = (data: {
        valid: boolean;
        discountPercent: number;
        couponCode: string;
    }) => {
        console.log(
            "🔥 REFERRAL RESULT:",
            data
        );

        if (data.valid) {
            setDiscountPercent(
                data.discountPercent
            );

            setCouponCode(
                data.couponCode
            );

            console.log(
                "🔥 DISCOUNT STATE SET:",
                data.discountPercent
            );

            console.log(
                "🔥 COUPON STATE SET:",
                data.couponCode
            );

            return;
        }

        setDiscountPercent(0);
        setCouponCode("");

        console.log(
            "🔥 REFERRAL RESET: discount = 0"
        );
    };

    /* =========================================================
       EXPERT SERVICES
    ========================================================= */

    const handleServiceToggle = (
        serviceId: string
    ) => {
        const hasMissingDetails =
            !details.fullName.trim() ||
            !details.email.trim() ||
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                details.email.trim()
            ) ||
            !details.phone.trim() ||
            !details.acceptedTerms;

        if (hasMissingDetails) {
            showValidationDialog();
            return;
        }

        setSelectedServices((previous) =>
            previous.includes(serviceId)
                ? previous.filter(
                    (id) =>
                        id !== serviceId
                )
                : [
                    ...previous,
                    serviceId,
                ]
        );
    };

    /* =========================================================
       PRICE
    ========================================================= */

    const calculateFinalPrice = (
        plan: EnrollmentPlan
    ) => {
        const discountAmount =
            discountPercent > 0
                ? (plan.price *
                    discountPercent) /
                100
                : 0;

        return Math.max(
            plan.price -
            discountAmount,
            0
        );
    };

    /* =========================================================
       VALIDATE ENROLLMENT
    ========================================================= */

    const validateEnrollment = (): boolean => {
        const newErrors: typeof errors =
            {};

        if (!details.fullName.trim()) {
            newErrors.fullName =
                "Please enter your full name.";
        }

        if (!details.email.trim()) {
            newErrors.email =
                "Please enter your email address.";
        } else if (
            !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                details.email.trim()
            )
        ) {
            newErrors.email =
                "Please enter a valid email address.";
        }

        if (!details.phone.trim()) {
            newErrors.phone =
                "Please enter your phone number.";
        }

        if (!details.acceptedTerms) {
            newErrors.acceptedTerms =
                "Please agree to the Terms & Conditions.";
        }

        setErrors(newErrors);

        return (
            Object.keys(newErrors).length ===
            0
        );
    };

    /* =========================================================
       RAZORPAY
    ========================================================= */

    const openRazorpayCheckout = async (
        plan: { name: string; price: number },
        orderId: string,
        amount: number,
        currency: string,
        keyId: string,
        finalPrice: number
    ) => {
        if (!window.Razorpay) {
            throw new Error(
                "Razorpay Checkout is not available."
            );
        }

        const options: RazorpayOptions = {
            key: keyId,

            amount,

            currency,

            name: "GRIND AI",

            description: plan.name,

            order_id: orderId,

            prefill: {
                name: details.fullName.trim(),
                email: details.email.trim(),
                contact: details.phone.trim(),
            },

            notes: {
                plan_name: plan.name,
                coupon_code:
                    couponCode || "",
            },

            theme: {
                color: "#ff8a2a",
            },

            handler: async (
                razorpayResponse
            ) => {
                await handlePaymentVerification(
                    razorpayResponse,
                    plan,
                    finalPrice
                );
            },

            modal: {
                ondismiss: () => {
                    console.log(
                        "ℹ️ RAZORPAY CHECKOUT CLOSED"
                    );

                    setLoadingPlanId(null);
                },
            },
        };

        const razorpay =
            new window.Razorpay(
                options
            );

        razorpay.open();
    };

    /* =========================================================
       VERIFY PAYMENT
    ========================================================= */

    const handlePaymentVerification =
        async (
            response: RazorpayPaymentResponse,
            plan: { name: string; price: number },
            finalPrice: number
        ) => {
            try {
                setPaymentError("");

                console.log(
                    "🔥 RAZORPAY PAYMENT SUCCESS:",
                    response
                );

                const verificationResponse =
                    await verifyPayment({
                        razorpay_order_id:
                            response.razorpay_order_id,

                        razorpay_payment_id:
                            response.razorpay_payment_id,

                        razorpay_signature:
                            response.razorpay_signature,

                        name:
                            details.fullName.trim(),

                        email:
                            details.email.trim(),

                        phone:
                            details.phone.trim(),

                        plan:
                            plan.name,

                        original_price:
                            plan.price,

                        discount_percent:
                            discountPercent,

                        coupon_code:
                            couponCode ||
                            undefined,

                        final_price:
                            finalPrice,
                    });

                console.log(
                    "🔥 PAYMENT VERIFICATION RESPONSE:",
                    verificationResponse
                );

                if (
                    !verificationResponse.success
                ) {
                    throw new Error(
                        verificationResponse.message ||
                        "Payment verification failed."
                    );
                }

                setProgrammeLink(
                    verificationResponse.programme_link ||
                    ""
                );

                setPaymentSuccess(true);
            } catch (error) {
                console.error(
                    "❌ PAYMENT VERIFICATION ERROR:",
                    error
                );

                setPaymentError(
                    error instanceof Error
                        ? error.message
                        : "Payment verification failed. Please contact support."
                );
            } finally {
                setLoadingPlanId(null);
            }
        };

    /* =========================================================
       SERVICE PURCHASE
    ========================================================= */

    const handleServicePurchase = async (
        service: ExpertService
    ) => {
        const valid = validateEnrollment();

        if (!valid) {
            showValidationDialog();
            document
                .getElementById("enrollment-details-section")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });
            return;
        }

        if (loadingPlanId) return;

        try {
            setPaymentError("");
            setLoadingPlanId(service.id);

            const finalPrice = service.price;

            console.log(
                "🔥 STARTING SERVICE PURCHASE:",
                {
                    service: service.title,
                    price: service.price,
                }
            );

            const razorpayLoaded =
                await loadRazorpayScript();

            if (
                !razorpayLoaded ||
                !window.Razorpay
            ) {
                throw new Error(
                    "Unable to load Razorpay. Please check your internet connection and try again."
                );
            }

            const orderResponse =
                await createPaymentOrder({
                    plan: service.title,
                    price: service.price,
                });

            console.log(
                "🔥 CREATE ORDER RESPONSE:",
                orderResponse
            );

            if (
                !orderResponse.success ||
                !orderResponse.order_id ||
                !orderResponse.key_id
            ) {
                throw new Error(
                    orderResponse.message ||
                    "Unable to create payment order."
                );
            }

            await openRazorpayCheckout(
                { name: service.title, price: service.price },
                orderResponse.order_id,
                orderResponse.amount ??
                finalPrice * 100,
                orderResponse.currency ||
                "INR",
                orderResponse.key_id,
                finalPrice
            );
        } catch (error) {
            console.error(
                "❌ SERVICE PURCHASE ERROR:",
                error
            );

            setPaymentError(
                error instanceof Error
                    ? error.message
                    : "Unable to start payment. Please try again."
            );

            setLoadingPlanId(null);
        }
    };

    /* =========================================================
       PLAN PURCHASE
    ========================================================= */

    const handlePlanSelect = async (
        plan: EnrollmentPlan
    ) => {
        const valid =
            validateEnrollment();

        if (!valid) {
            showValidationDialog();

            document
                .getElementById("enrollment-details-section")
                ?.scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                });

            return;
        }

        if (loadingPlanId) {
            return;
        }

        try {
            setPaymentError("");
            setSelectedPlanId(plan.id);
            setLoadingPlanId(plan.id);

            const finalPrice =
                calculateFinalPrice(plan);

            console.log(
                "🔥 STARTING PLAN PURCHASE:",
                {
                    plan:
                        plan.name,
                    originalPrice:
                        plan.price,
                    discountPercent,
                    couponCode,
                    finalPrice,
                }
            );

            const razorpayLoaded =
                await loadRazorpayScript();

            if (
                !razorpayLoaded ||
                !window.Razorpay
            ) {
                throw new Error(
                    "Unable to load Razorpay. Please check your internet connection and try again."
                );
            }

            const orderResponse =
                await createPaymentOrder({
                    plan: plan.name,

                    price: plan.price,

                    coupon:
                        couponCode ||
                        undefined,
                });

            console.log(
                "🔥 CREATE ORDER RESPONSE:",
                orderResponse
            );

            if (
                !orderResponse.success ||
                !orderResponse.order_id ||
                !orderResponse.key_id
            ) {
                throw new Error(
                    orderResponse.message ||
                    "Unable to create payment order."
                );
            }

            await openRazorpayCheckout(
                plan,
                orderResponse.order_id,
                orderResponse.amount ??
                finalPrice * 100,
                orderResponse.currency ||
                "INR",
                orderResponse.key_id,
                finalPrice
            );
        } catch (error) {
            console.error(
                "❌ PLAN PURCHASE ERROR:",
                error
            );

            setPaymentError(
                error instanceof Error
                    ? error.message
                    : "Unable to start payment. Please try again."
            );

            setLoadingPlanId(null);
        }
    };

    /* =========================================================
       SUCCESS SCREEN
    ========================================================= */

    if (paymentSuccess) {
        return (
            <Box
                sx={{
                    minHeight: "100vh",
                    backgroundColor:
                        "#050505",
                    color: "#f5f5f0",
                }}
            >
                <Box
                    sx={{
                        borderBottom:
                            "1px solid #242424",
                        backgroundColor:
                            "#050505",
                    }}
                >
                    <Container
                        maxWidth="lg"
                        sx={{
                            py: 2,
                        }}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                alignItems:
                                    "center",
                                justifyContent:
                                    "space-between",
                            }}
                        >
                            <Typography
                                sx={{
                                    color: "#f5f5f0",
                                    fontFamily:
                                        '"Bebas Neue", sans-serif',
                                    fontSize: {
                                        xs: 32,
                                        sm: 38,
                                    },
                                    lineHeight: 1,
                                    letterSpacing: "-0.5px",
                                }}
                            >
                                GRIND
                                <Box
                                    component="span"
                                    sx={{ color: "#ff8a2a" }}
                                >
                                    .
                                </Box>
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize:
                                        "12px",
                                    fontWeight: 700,
                                    letterSpacing:
                                        "0.12em",
                                    color:
                                        "#777777",
                                }}
                            >
                                GRIND AI
                            </Typography>
                        </Box>
                    </Container>
                </Box>

                <Container maxWidth="lg">
                    <EnrollmentSuccess
                        programmeLink={
                            programmeLink
                        }
                    />
                </Container>

                <EnrollmentFooter />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                backgroundColor:
                    "#050505",
                color: "#f5f5f0",
            }}
        >
            <Box
                sx={{
                    borderBottom:
                        "1px solid #242424",
                    backgroundColor:
                        "#050505",
                }}
            >
                <Container
                    maxWidth="lg"
                    sx={{
                        py: 2,
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems:
                                "center",
                            justifyContent:
                                "space-between",
                        }}
                    >
                        <Typography
                            sx={{
                                color: "#f5f5f0",
                                fontFamily:
                                    '"Bebas Neue", sans-serif',
                                fontSize: {
                                    xs: 32,
                                    sm: 38,
                                },
                                lineHeight: 1,
                                letterSpacing: "-0.5px",
                            }}
                        >
                            GRIND
                            <Box
                                component="span"
                                sx={{ color: "#ff8a2a" }}
                            >
                                .
                            </Box>
                        </Typography>

                        <Typography
                            sx={{
                                fontSize: "12px",
                                fontWeight: 700,
                                letterSpacing:
                                    "0.12em",
                                color:
                                    "#777777",
                            }}
                        >
                            GRIND AI
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Box
                sx={{
                    backgroundColor:
                        "#050505",
                    color:
                        "#f5f5f0",
                }}
            >
                <Container
                    maxWidth={false}
                    sx={{
                        width:
                            "100%",
                        maxWidth:
                            1280,
                        mx: "auto",
                        px: {
                            xs: 2.5,
                            md: 0,
                        },
                    }}
                >
                    <Box
                        sx={{
                            width:
                                "100%",
                            maxWidth:
                                850,
                            mx: "auto",
                            textAlign: "center",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            pt: {
                                xs: 10,
                                sm: 12,
                                md: 13,
                            },
                            pb: {
                                xs: 8,
                                md: 10,
                            },
                        }}
                    >
                        <Typography
                            component="h1"
                            sx={{
                                color:
                                    "#f5f5f0",
                                fontFamily:
                                    '"Bebas Neue", sans-serif',
                                fontSize: {
                                    xs: 54,
                                    sm: 68,
                                    md: 86,
                                },
                                fontWeight:
                                    400,
                                lineHeight:
                                    0.93,
                                letterSpacing:
                                    "-0.5px",
                                textTransform:
                                    "uppercase",
                                m: 0,
                            }}
                        >
                            YOUR PERSONALIZED
                            <br />
                            PROGRAMME IS READY
                        </Typography>

                        <Typography
                            sx={{
                                color:
                                    "#777",
                                fontFamily:
                                    '"Inter", sans-serif',
                                fontSize: {
                                    xs: 12,
                                    md: 14,
                                },
                                lineHeight:
                                    1.9,
                                maxWidth:
                                    680,
                                mt: {
                                    xs: 3.5,
                                    md: 4,
                                },
                            }}
                        >
                            Based on your assessment, we have
                            prepared a personalized fitness
                            roadmap aligned to your goals,
                            lifestyle and experience level.
                        </Typography>

                        <Typography
                            sx={{
                                color:
                                    "#ff8a2a",
                                fontFamily:
                                    '"Inter", sans-serif',
                                fontSize: {
                                    xs: 13,
                                    md: 16,
                                },
                                fontWeight:
                                    600,
                                lineHeight:
                                    1.65,
                                maxWidth:
                                    700,
                                mt: {
                                    xs: 2.5,
                                    md: 3,
                                },
                            }}
                        >
                            Complete your enrollment to unlock
                            your plan and receive your private
                            programme link.
                        </Typography>
                    </Box>
                </Container>
            </Box>

            <Container
                id="enrollment-details-section"
                maxWidth="lg"
                sx={{
                    py: {
                        xs: 6,
                        sm: 8,
                        md: 10,
                    },
                }}
            >
                <EnrollmentDetails
                    data={details}
                    onChange={
                        handleDetailsChange
                    }
                    errors={errors}
                />

                <Box sx={{ mt: 6 }}>
                    <EnrollmentReferral
                        referralCode={
                            referralCode
                        }
                        onChange={
                            setReferralCode
                        }
                        onValidated={
                            handleReferralValidated
                        }
                    />
                </Box>

                <Box sx={{ mt: 8 }}>
                    <EnrollmentPlans
                        plans={plans}
                        selectedPlanId={
                            selectedPlanId
                        }
                        onSelect={
                            handlePlanSelect
                        }
                        discountPercent={
                            discountPercent
                        }
                        loadingPlanId={
                            loadingPlanId
                        }
                    />
                </Box>

                {paymentError && (
                    <Box
                        sx={{
                            mt: 3,
                            border:
                                "1px solid #5a2525",
                            backgroundColor:
                                "#160909",
                            px: 2,
                            py: 1.5,
                        }}
                    >
                        <Typography
                            sx={{
                                color:
                                    "#ff6b6b",
                                fontFamily:
                                    '"Inter", sans-serif',
                                fontSize:
                                    10,
                                lineHeight:
                                    1.6,
                            }}
                        >
                            {
                                paymentError
                            }
                        </Typography>
                    </Box>
                )}

                <Box sx={{ mt: 10 }}>
                    <EnrollmentNextSteps />
                </Box>

                <Box sx={{ mt: 10 }}>
                    <EnrollmentExpertServices
                        selectedServices={
                            selectedServices
                        }
                        onToggle={
                            handleServiceToggle
                        }
                        onPurchase={
                            handleServicePurchase
                        }
                    />
                </Box>

                {selectedPlan && (
                    <Box sx={{ mt: 10 }}>
                        <EnrollmentSummary
                            planName={
                                selectedPlan.name
                            }
                            planPrice={
                                selectedPlan.price
                            }
                            discountPercent={
                                discountPercent
                            }
                            couponCode={
                                couponCode
                            }
                        />
                    </Box>
                )}

                <Box sx={{ mt: 10 }}>
                    <EnrollmentTerms />
                </Box>
            </Container>

            <EnrollmentFooter />

            <Dialog
                open={validationDialogOpen}
                onClose={closeValidationDialog}
                fullWidth
                maxWidth="xs"
                disableRestoreFocus
                slotProps={{
                    paper: {
                        sx: {
                            borderRadius: 0,
                            border: "1px solid #242424",
                            backgroundColor: "#0d0d0d",
                            color: "#f5f5f0",
                        },
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        color:
                            "#f5f5f0",
                        fontFamily:
                            '"Bebas Neue", sans-serif',
                        fontSize: 30,
                        fontWeight: 400,
                        letterSpacing:
                            "0.5px",
                        pb: 1,
                    }}
                >
                    COMPLETE YOUR DETAILS
                </DialogTitle>

                <DialogContent>
                    <Typography
                        sx={{
                            color:
                                "#777",
                            fontFamily:
                                '"Inter", sans-serif',
                            fontSize:
                                12,
                            lineHeight:
                                1.8,
                        }}
                    >
                        {
                            validationDialogMessage
                        }
                    </Typography>
                </DialogContent>

                <DialogActions
                    sx={{
                        px: 3,
                        pb: 3,
                    }}
                >
                    <Button
                        onClick={
                            closeValidationDialog
                        }
                        sx={{
                            color:
                                "#050505",
                            backgroundColor:
                                "#ff8a2a",
                            fontFamily:
                                '"Inter", sans-serif',
                            fontSize:
                                11,
                            fontWeight:
                                700,
                            letterSpacing:
                                "0.08em",
                            borderRadius:
                                0,
                            px: 3,
                            py: 1.2,
                            "&:hover": {
                                backgroundColor:
                                    "#ff8a2a",
                            },
                        }}
                    >
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}