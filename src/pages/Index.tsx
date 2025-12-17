import { useState } from "react";
import {
  Users,
  CheckCircle,
  DollarSign,
  TrendingUp,
  Clock,
  Zap,
} from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import LeadsTable, { type Lead } from "@/components/dashboard/LeadsTable";
import MessageModal from "@/components/dashboard/MessageModal";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import LeadScoreCard from "@/components/dashboard/LeadScoreCard";

const Index = () => {
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSelectLead = (lead: Lead) => {
    setSelectedLead(lead);
    if (lead.status === "Pending Review") {
      setModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-foreground">Vistage Lead Gen Agent</h1>
                <p className="text-sm text-muted-foreground">AI-Powered Lead Intelligence</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Campaign Active</p>
                <p className="text-sm font-medium text-success flex items-center gap-1 justify-end">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                  </span>
                  Running
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-8">
        {/* Metrics Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <MetricCard
            title="Total Leads"
            value="550"
            icon={<Users className="w-5 h-5" />}
            variant="primary"
            subtitle="This month"
            animationDelay={0}
          />
          <MetricCard
            title="Qualified"
            value="420"
            icon={<CheckCircle className="w-5 h-5" />}
            variant="success"
            subtitle="76% qualification rate"
            animationDelay={50}
          />
          <MetricCard
            title="Campaign Cost"
            value="$467.50"
            icon={<DollarSign className="w-5 h-5" />}
            variant="neutral"
            subtitle="$0.85 per lead"
            animationDelay={100}
          />
          <MetricCard
            title="Value Generated"
            value="$13,750"
            icon={<TrendingUp className="w-5 h-5" />}
            variant="success"
            subtitle="29x ROI"
            animationDelay={150}
          />
          <MetricCard
            title="Time Saved"
            value="137 hrs"
            icon={<Clock className="w-5 h-5" />}
            variant="primary"
            subtitle="vs manual outreach"
            animationDelay={200}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Lead Score Card */}
          <div className="lg:col-span-1">
            <LeadScoreCard lead={selectedLead} />
          </div>

          {/* Leads Table */}
          <div className="lg:col-span-2">
            <LeadsTable onSelectLead={handleSelectLead} />
          </div>

          {/* Activity Feed */}
          <div className="lg:col-span-1">
            <ActivityFeed />
          </div>
        </div>
      </main>

      {/* Message Modal */}
      <MessageModal
        lead={selectedLead}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
};

export default Index;
