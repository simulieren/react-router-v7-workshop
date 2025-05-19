import type { Route } from "./+types/user-profile";

export async function loader() {
  // Mock user data - replace with actual API call
  return {
    user: {
      name: "John Doe",
      email: "john.doe@example.com",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
      role: "Software Developer",
      location: "San Francisco, CA",
      bio: "Passionate about building great software and solving complex problems."
    }
  };
}

export default function UserProfile({loaderData}: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="flex items-center space-x-6">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="w-24 h-24 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-gray-600 dark:text-gray-300">{user.role}</p>
            <p className="text-gray-500 dark:text-gray-400">{user.location}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.email}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">Bio</h3>
            <p className="text-gray-600 dark:text-gray-300">{user.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
