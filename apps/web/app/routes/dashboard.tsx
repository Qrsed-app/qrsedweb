import { Plus } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { CreateRoomDialog } from "../components/CreateRoomDialog";
import { RoomCard } from "../components/RoomCard";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { useRooms } from "../lib/api-hooks";
import { signOut, useSession } from "../lib/auth-client";

export default function Dashboard() {
  const { data: session, isPending } = useSession();
  const { data: rooms } = useRooms();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !session) {
      navigate("/sign-in");
    }
  }, [session, isPending, navigate]);

  const handleViewRoomDetails = (roomId: string) => {
    navigate(`/rooms/${roomId}`);
  };

  const handleSignOut = async () => {
    await signOut({
      fetchOptions: {
        onSuccess: () => {
          navigate("/sign-in");
        },
      },
    });
  };

  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="hidden md:flex items-center">
              <h1 className="text-2xl font-bold text-foreground">D&D Campaign Manager</h1>
            </div>
            <div className="flex items-center space-x-4 justify-between grow md:grow-0">
              <span className="text-sm text-muted-foreground">
                Welcome, {session.user.name || session.user.email}!
              </span>
              <Button variant="secondary" onClick={handleSignOut}>
                Sign out
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0">
          <div className="mt-6">
            <div className="mb-4">
              <h2 className="text-2xl font-bold">All Campaigns</h2>
              <p className="text-gray-600">Manage your campaigns and view details</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rooms &&
                rooms.length > 0 &&
                rooms.map(room => (
                  <RoomCard
                    key={room.id}
                    room={room}
                    currentUserId={session.user.id}
                    onViewDetails={handleViewRoomDetails}
                  />
                ))}
              <Card className="group cursor-pointer">
                <CreateRoomDialog>
                  <CardContent className="flex items-center justify-center h-full">
                    <Plus className="size-14 text-muted-foreground group-hover:text-primary group-hover:size-16 transition-all duration-300" />
                  </CardContent>
                </CreateRoomDialog>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
