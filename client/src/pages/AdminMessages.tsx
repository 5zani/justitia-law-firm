import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { trpc } from "@/lib/trpc";
import { Mail, MailOpen, Phone } from "lucide-react";

export default function AdminMessages() {
  const { user, loading } = useAuth();
  const submissionsQuery = trpc.admin.contacts.list.useQuery();
  const markReadMutation = trpc.admin.contacts.markRead.useMutation({
    onSuccess: () => submissionsQuery.refetch(),
  });
  const deleteMutation = trpc.admin.contacts.delete.useMutation({
    onSuccess: () => submissionsQuery.refetch(),
  });

  if (loading) {
    return <DashboardLayout>Loading...</DashboardLayout>;
  }

  if (!user || user.role !== "admin") {
    return (
      <DashboardLayout>
        <div className="p-8 text-center">
          <p className="text-red-600 font-semibold">Access Denied: Admin privileges required</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Contact Messages</h1>
          <p className="text-muted-foreground mt-2">Messages submitted through the website contact form</p>
        </div>

        <div className="grid gap-4">
          {submissionsQuery.isLoading ? (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">Loading messages...</p>
            </Card>
          ) : submissionsQuery.data && submissionsQuery.data.length > 0 ? (
            submissionsQuery.data.map((msg: any) => (
              <Card key={msg.id} className={`p-6 ${msg.read ? "" : "border-accent/40 bg-accent/5"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {msg.read ? (
                        <MailOpen className="w-4 h-4 text-muted-foreground" />
                      ) : (
                        <Mail className="w-4 h-4 text-accent" />
                      )}
                      <h3 className="text-lg font-bold text-foreground">{msg.subject}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-1">
                      From: <span className="font-medium text-foreground">{msg.name}</span> ({msg.email})
                    </p>
                    <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
                      <Phone className="w-3 h-3" /> {msg.phone}
                    </p>
                    <p className="text-foreground whitespace-pre-wrap">{msg.message}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-3">
                      <span>{new Date(msg.createdAt).toLocaleString()}</span>
                      <span>{msg.emailSent ? "Email notification sent" : "Email notification not sent"}</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    {!msg.read && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => markReadMutation.mutate({ id: msg.id })}
                      >
                        Mark as read
                      </Button>
                    )}
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-red-600 border-red-200 hover:bg-red-50"
                      onClick={() => {
                        if (confirm("Delete this message? This cannot be undone.")) {
                          deleteMutation.mutate({ id: msg.id });
                        }
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          ) : (
            <Card className="p-8 text-center">
              <p className="text-muted-foreground">No messages yet.</p>
            </Card>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
