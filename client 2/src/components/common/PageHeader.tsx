import { motion } from "framer-motion";

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: string;
}

const PageHeader = ({ title, description, badge }: PageHeaderProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    className="mb-8"
  >
    {badge && (
      <span className="mb-3 inline-block rounded-full bg-secondary/15 px-3 py-1 text-xs font-semibold text-secondary">
        {badge}
      </span>
    )}
    <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">{title}</h1>
    {description && (
      <p className="mt-2 max-w-2xl text-muted-foreground">{description}</p>
    )}
  </motion.div>
);

export default PageHeader;
