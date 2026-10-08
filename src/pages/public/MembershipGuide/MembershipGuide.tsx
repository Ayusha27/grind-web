
import ExpertServices from "./ExpertServices";
import HowGrindWorks from "./HowGrindWorks";
import MembershipFAQ from "./MembershipFAQ";
import MembershipHero from "./MembershipHero";
import MembershipPlans from "./MembershipPlans";
import PlanComparison from "./PlanComparison";
import TermsAndConditions from "./TermsAndConditions";
import WhyGrind from "./WhyGrind";
import FinalCTA from "../Home/FinalCTA";

const MembershipGuide = () => {
  return (
    <>
      <MembershipHero />
      <WhyGrind />
      <MembershipPlans />
      <PlanComparison />
      <ExpertServices />
      <HowGrindWorks />
      <FinalCTA />
      <MembershipFAQ />
      <TermsAndConditions />
    </>
  );
};

export default MembershipGuide;
