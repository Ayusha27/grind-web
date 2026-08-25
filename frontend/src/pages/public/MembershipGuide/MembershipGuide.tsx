
import ExpertServices from "./ExpertServices";
import HowGrindWorks from "./HowGrindWorks";
import MembershipFAQ from "./MembershipFAQ";
import MembershipHero from "./MembershipHero";
import MembershipPlans from "./MembershipPlans";
import PlanComparison from "./PlanComparison";
import TermsAndConditions from "./TermsAndConditions";
import WhyGrind from "./WhyGrind";

const MembershipGuide = () => {
  return (
    <>
      <MembershipHero />
      <WhyGrind />
      <MembershipPlans />
      <PlanComparison />
      <ExpertServices />
      <HowGrindWorks />
      <MembershipFAQ />
      <TermsAndConditions />
    </>
  );
};

export default MembershipGuide;