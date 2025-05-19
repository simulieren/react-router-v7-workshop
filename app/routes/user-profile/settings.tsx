import type { Route } from "./+types/settings";
import { Form } from "react-router";

export async function loader({request}: Route.LoaderArgs) {
  // Mock user data - replace with actual API call
  return {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      role: "Software Developer",
      location: "San Francisco, CA",
      bio: "Passionate about building great software and solving complex problems.",
      notifications: {
        email: true,
        push: false,
        sms: true
      },
      theme: "light"
    }
  } as const;
}

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  // Mock API call to update settings
  return null;
}

export default function Settings({loaderData}: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-6">Account Settings</h2>

        <Form method="post" className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Profile Information</h3>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  defaultValue={user.name}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  defaultValue={user.email}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                />
              </div>

              <div>
                <label htmlFor="bio" className="block text-sm font-medium mb-1">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  defaultValue={user.bio}
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700"
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Preferences</h3>
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  defaultChecked={user.notifications.email}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="emailNotifications" className="ml-2 block text-sm">
                  Email Notifications
                </label>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="pushNotifications"
                  name="pushNotifications"
                  defaultChecked={user.notifications.push}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="pushNotifications" className="ml-2 block text-sm">
                  Push Notifications
                </label>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
