import { Search, MapPin, Sparkles } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface JobFiltersProps {
  keyword: string;
  location: string;
  skill: string;
  onKeywordChange: (v: string) => void;
  onLocationChange: (v: string) => void;
  onSkillChange: (v: string) => void;
  onSearch: () => void;
  onClear: () => void;
  loading?: boolean;
}

const JobFilters = ({
  keyword,
  location,
  skill,
  onKeywordChange,
  onLocationChange,
  onSkillChange,
  onSearch,
  onClear,
  loading,
}: JobFiltersProps) => (
  <div className="rounded-2xl border border-border bg-card/60 p-4 backdrop-blur-xl md:p-6">
    <div className="grid gap-3 md:grid-cols-4">
      <div className="relative md:col-span-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Job title or keyword"
          value={keyword}
          onChange={(e) => onKeywordChange(e.target.value)}
          className="pl-9"
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
      </div>
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Location"
          value={location}
          onChange={(e) => onLocationChange(e.target.value)}
          className="pl-9"
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
      </div>
      <div className="relative">
        <Sparkles className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Skill"
          value={skill}
          onChange={(e) => onSkillChange(e.target.value)}
          className="pl-9"
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
      </div>
      <div className="flex gap-2">
        <Button
          onClick={onSearch}
          disabled={loading}
          className="flex-1 bg-secondary text-secondary-foreground hover:bg-secondary/90"
        >
          Search
        </Button>
        <Button variant="outline" onClick={onClear} disabled={loading}>
          Clear
        </Button>
      </div>
    </div>
  </div>
);

export default JobFilters;
