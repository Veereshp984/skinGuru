import {
  BrainIcon,
  ClockIcon,
  PhoneCheckIcon,
  ReportIcon,
} from "../components/icons/AppIcons";
import { BenefitCard } from "../components/shared/BenefitCard";

const iconMap = {
  brain: BrainIcon,
  clock: ClockIcon,
  phone: PhoneCheckIcon,
  report: ReportIcon,
};

export function BenefitsSection({ cards }) {
  return (
    <section
      id="benefits"
      className="scroll-mt-28 rounded-[40px] border border-white/70 bg-white/54 p-6 shadow-soft backdrop-blur-2xl sm:p-8"
    >
      <p className="text-xs uppercase tracking-[0.3em] text-sage">Benefits</p>
      <h2 className="mt-3 font-display text-4xl leading-none sm:text-5xl">
        Why this experience feels easier to use.
      </h2>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => {
          const Icon = iconMap[card.icon];
          return <BenefitCard key={card.title} title={card.title} text={card.text} Icon={Icon} />;
        })}
      </div>
    </section>
  );
}
