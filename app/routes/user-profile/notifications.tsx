import type { Route } from "./+types/notifications";
import { Form } from "react-router";

export async function loader({request}: Route.LoaderArgs) {
  // Mock notification data - replace with actual API call
  return {
    notifications: [
      {
        id: 1,
        title: "New Message",
        description: "You have a new message from Jane Smith",
        time: "5 minutes ago",
        read: false
      },
      {
        id: 2, 
        title: "System Update",
        description: "The system will be undergoing maintenance tonight",
        time: "2 hours ago",
        read: true
      },
      {
        id: 3,
        title: "Profile Update",
        description: "Your profile changes have been saved successfully",
        time: "1 day ago", 
        read: true
      }
    ]
  } as const;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  // Mock API call to mark notifications as read
  return null;
}

export default function Notifications({loaderData}: Route.ComponentProps) {
  const { notifications } = loaderData;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Notifications</h2>
          <Form method="post">
            <button
              type="submit"
              name="action"
              value="markAllRead"
              className="text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              Mark all as read
            </button>
          </Form>
        </div>

        <div className="space-y-4">
          {notifications.map((notification) => (
            <div 
              key={notification.id}
              className={`p-4 rounded-lg border ${
                notification.read 
                  ? 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700' 
                  : 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800'
              }`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold">{notification.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    {notification.description}
                  </p>
                  <span className="text-sm text-gray-500 dark:text-gray-400 mt-2 block">
                    {notification.time}
                  </span>
                </div>
                {!notification.read && (
                  <div className="h-2 w-2 bg-blue-600 rounded-full"></div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
