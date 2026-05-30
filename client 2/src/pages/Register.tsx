import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Briefcase, Loader2, User, Building2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import type { UserRole } from "@/types";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  role: z.enum(["jobseeker", "recruiter"]),
});

type FormData = z.infer<typeof schema>;

const Register = () => {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { role: "jobseeker" },
  });

  const role = watch("role");

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      await registerUser(data);
      toast.success("Account created! Please sign in.");
      navigate("/login");
    } catch (err: unknown) {
      const msg =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "Registration failed";
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const selectRole = (r: UserRole) => setValue("role", r);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4 py-12">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/10 via-background to-primary/10" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md rounded-2xl border border-border bg-card/80 p-8 shadow-2xl backdrop-blur-xl"
      >
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
            <Briefcase className="h-6 w-6 text-secondary-foreground" />
          </div>
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="mt-1 text-sm text-muted-foreground">Join as a job seeker or recruiter</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => selectRole("jobseeker")}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
              role === "jobseeker"
                ? "border-secondary bg-secondary/10 text-secondary"
                : "border-border hover:bg-muted/50"
            )}
          >
            <User className="h-6 w-6" />
            <span className="text-sm font-medium">Job Seeker</span>
          </button>
          <button
            type="button"
            onClick={() => selectRole("recruiter")}
            className={cn(
              "flex flex-col items-center gap-2 rounded-xl border p-4 transition-all",
              role === "recruiter"
                ? "border-secondary bg-secondary/10 text-secondary"
                : "border-border hover:bg-muted/50"
            )}
          >
            <Building2 className="h-6 w-6" />
            <span className="text-sm font-medium">Recruiter</span>
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input type="hidden" {...register("role")} />
          <div>
            <Label htmlFor="name">Full name</Label>
            <Input id="name" className="mt-1.5" {...register("name")} />
            {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name.message}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" className="mt-1.5" {...register("email")} />
            {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email.message}</p>}
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" className="mt-1.5" {...register("password")} />
            {errors.password && (
              <p className="mt-1 text-xs text-destructive">{errors.password.message}</p>
            )}
          </div>
          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
          >
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Create account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-secondary hover:underline">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default Register;
