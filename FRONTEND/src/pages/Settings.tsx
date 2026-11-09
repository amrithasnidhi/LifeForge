import { Link, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAuth } from "@/hooks/AuthContext";
import { api } from "@/lib/api";

export default function Settings() {
  const { role, orgType, userName, profile, logout } = useAuth();
  const navigate = useNavigate();

  const rows: [string, string | undefined][] = [
    ["Name", profile?.name || userName],
    ["Role", role ?? undefined],
    ["Organization type", role === "hospital" ? orgType ?? undefined : undefined],
    ["City", profile?.city],
    ["Blood group", profile?.blood_group],
    ["Verified", profile ? (profile.is_verified ? "Yes" : "No") : undefined],
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="pt-24 pb-16 container mx-auto px-4 max-w-2xl">
        <h1 className="font-display text-3xl font-bold mb-6">Account settings</h1>
        {!role ? (
          <div className="rounded-xl border border-border bg-card p-8 text-center">
            <p className="font-body text-muted-foreground mb-4">Log in to see your account settings.</p>
            <Button asChild><Link to="/login">Log in</Link></Button>
          </div>
        ) : (
          <div className="rounded-xl border border-border bg-card p-6 space-y-6">
            <dl className="divide-y divide-border">
              {rows.filter(([, v]) => v).map(([label, value]) => (
                <div key={label} className="flex justify-between py-3 font-body">
                  <dt className="text-muted-foreground">{label}</dt>
                  <dd className="font-medium capitalize">{value}</dd>
                </div>
              ))}
            </dl>
            <Button variant="outline" onClick={() => { api.auth.logout(); logout(); navigate("/"); }}>
              <LogOut className="w-4 h-4 mr-2" /> Log out
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
