
import { redirect } from "next/navigation";

export default async function Dashboard() {

  redirect("/dashboard/overview");
  // // Redirect based on user role directly from the server component
  // if (user.role === "admin" || user.role === "user") {
  //   return 
  // } else {
  //   // Redirect to a different page for other roles or an error page if needed
  //   return redirect("/not-authorized");
  // }
}
