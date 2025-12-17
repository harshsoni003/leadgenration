import { useState } from "react";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Key,
  Shield,
  Zap,
  Save,
  ExternalLink,
  Linkedin,
  Mail,
  Clock,
  Target,
  AlertCircle,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  const [dailyLimit, setDailyLimit] = useState([100]);
  const [autoApproveThreshold, setAutoApproveThreshold] = useState([90]);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSendEnabled, setAutoSendEnabled] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
              <p className="text-sm text-muted-foreground">
                Configure your AI agent preferences and integrations
              </p>
            </div>
            <Button className="gap-2">
              <Save className="w-4 h-4" />
              Save Changes
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs defaultValue="general" className="space-y-6">
          <TabsList>
            <TabsTrigger value="general" className="gap-2">
              <SettingsIcon className="w-4 h-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="ai" className="gap-2">
              <Zap className="w-4 h-4" />
              AI Settings
            </TabsTrigger>
            <TabsTrigger value="integrations" className="gap-2">
              <ExternalLink className="w-4 h-4" />
              Integrations
            </TabsTrigger>
            <TabsTrigger value="notifications" className="gap-2">
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
          </TabsList>

          {/* General Settings */}
          <TabsContent value="general" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Profile Settings
                </CardTitle>
                <CardDescription>Manage your account information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Full Name</Label>
                    <Input defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label>Email</Label>
                    <Input defaultValue="john@vistage.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label>Company</Label>
                    <Input defaultValue="Vistage Philadelphia" />
                  </div>
                  <div className="space-y-2">
                    <Label>Role</Label>
                    <Input defaultValue="Chair / Executive Recruiter" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5" />
                  Campaign Defaults
                </CardTitle>
                <CardDescription>Set default targeting parameters for new campaigns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label>Default Location</Label>
                  <Input defaultValue="Philadelphia, PA" placeholder="Enter target location" />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Default Minimum Company Size</Label>
                    <span className="text-sm font-medium">50+ employees</span>
                  </div>
                  <Slider defaultValue={[50]} max={500} min={10} step={10} />
                </div>

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label>Default Minimum Followers</Label>
                    <span className="text-sm font-medium">5,000+</span>
                  </div>
                  <Slider defaultValue={[5000]} max={20000} min={1000} step={500} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Settings */}
          <TabsContent value="ai" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="w-5 h-5" />
                  AI Agent Configuration
                </CardTitle>
                <CardDescription>Fine-tune how the AI generates and processes leads</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Daily Processing Limit</Label>
                      <p className="text-sm text-muted-foreground">Maximum leads to process per day</p>
                    </div>
                    <span className="text-sm font-medium">{dailyLimit[0]} leads/day</span>
                  </div>
                  <Slider
                    value={dailyLimit}
                    onValueChange={setDailyLimit}
                    max={500}
                    min={10}
                    step={10}
                  />
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Auto-Approve Threshold</Label>
                      <p className="text-sm text-muted-foreground">Leads above this score are auto-approved</p>
                    </div>
                    <span className="text-sm font-medium">{autoApproveThreshold[0]}+ score</span>
                  </div>
                  <Slider
                    value={autoApproveThreshold}
                    onValueChange={setAutoApproveThreshold}
                    max={100}
                    min={70}
                    step={5}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Auto-Send Messages</Label>
                    <p className="text-sm text-muted-foreground">Automatically send approved messages</p>
                  </div>
                  <Switch checked={autoSendEnabled} onCheckedChange={setAutoSendEnabled} />
                </div>

                {autoSendEnabled && (
                  <div className="p-4 rounded-lg bg-warning/5 border border-warning/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">Caution: Auto-Send Enabled</p>
                        <p className="text-sm text-muted-foreground">
                          Messages will be sent automatically without manual review. Ensure your scoring threshold is set appropriately.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Message Personalization</CardTitle>
                <CardDescription>Configure how AI personalizes outreach messages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Message Template Base</Label>
                  <textarea
                    className="w-full min-h-[120px] p-3 rounded-lg border bg-background text-sm"
                    defaultValue={`Hi {firstName}, I noticed your recent {eventSignal} - {personalized_compliment}. As someone leading a company of {companySize}+, have you considered joining a peer advisory group? Vistage connects CEOs like yourself to share challenges and accelerate growth. Would love to share how it's helped similar leaders in {location}.`}
                  />
                  <p className="text-xs text-muted-foreground">
                    Available variables: {`{firstName}, {eventSignal}, {companySize}, {location}, {personalized_compliment}`}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Tone</Label>
                    <select className="w-full p-2 rounded-lg border bg-background">
                      <option>Professional & Friendly</option>
                      <option>Formal</option>
                      <option>Casual</option>
                      <option>Direct</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label>Message Length</Label>
                    <select className="w-full p-2 rounded-lg border bg-background">
                      <option>Short (100-150 chars)</option>
                      <option>Medium (150-250 chars)</option>
                      <option>Long (250-350 chars)</option>
                    </select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Integrations */}
          <TabsContent value="integrations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                  LinkedIn Integration
                </CardTitle>
                <CardDescription>Connect your LinkedIn account for lead sourcing</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg border bg-success/5 border-success/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-success/10">
                      <Linkedin className="w-5 h-5 text-success" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Connected</p>
                      <p className="text-sm text-muted-foreground">john.doe@linkedin.com</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-success border-success/30">Active</Badge>
                </div>

                <div className="mt-4 grid md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">2,450</p>
                    <p className="text-sm text-muted-foreground">Connections</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">150</p>
                    <p className="text-sm text-muted-foreground">Messages/month</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/50">
                    <p className="text-2xl font-bold">87%</p>
                    <p className="text-sm text-muted-foreground">Profile Strength</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Integration
                </CardTitle>
                <CardDescription>Connect email for follow-up sequences</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between p-4 rounded-lg border border-dashed">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <Mail className="w-5 h-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Not Connected</p>
                      <p className="text-sm text-muted-foreground">Connect for email follow-ups</p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  API Configuration
                </CardTitle>
                <CardDescription>Manage API keys and webhook endpoints</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>OpenAI API Key</Label>
                  <div className="flex gap-2">
                    <Input type="password" defaultValue="sk-proj-xxxxxxxxxxxx" className="font-mono" />
                    <Button variant="outline">Update</Button>
                  </div>
                  <p className="text-xs text-muted-foreground">Used for message personalization</p>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label>Webhook URL (Optional)</Label>
                  <Input placeholder="https://your-crm.com/webhook" />
                  <p className="text-xs text-muted-foreground">Receive lead updates in your CRM</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notification Preferences
                </CardTitle>
                <CardDescription>Choose how you want to be notified</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Enable Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates about your campaigns</p>
                  </div>
                  <Switch checked={notificationsEnabled} onCheckedChange={setNotificationsEnabled} />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">New Qualified Leads</p>
                      <p className="text-sm text-muted-foreground">When a lead passes qualification threshold</p>
                    </div>
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Message Replies</p>
                      <p className="text-sm text-muted-foreground">When a prospect responds to your message</p>
                    </div>
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Daily Summary</p>
                      <p className="text-sm text-muted-foreground">Daily digest of campaign performance</p>
                    </div>
                    <Switch defaultChecked disabled={!notificationsEnabled} />
                  </div>

                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Event Signals Detected</p>
                      <p className="text-sm text-muted-foreground">When high-value signals are found</p>
                    </div>
                    <Switch disabled={!notificationsEnabled} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  Quiet Hours
                </CardTitle>
                <CardDescription>Pause notifications during specific times</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between py-3">
                  <div>
                    <p className="font-medium">Enable Quiet Hours</p>
                    <p className="text-sm text-muted-foreground">No notifications between set hours</p>
                  </div>
                  <Switch />
                </div>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div className="space-y-2">
                    <Label>Start Time</Label>
                    <Input type="time" defaultValue="22:00" />
                  </div>
                  <div className="space-y-2">
                    <Label>End Time</Label>
                    <Input type="time" defaultValue="08:00" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
