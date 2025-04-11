import { $auth } from "~/plugins/auth";

export default function (context) {
  // Add the userAgent property to the context
  context.userAgent = process.server
    ? context.req.headers["user-agent"]
    : navigator.userAgent;

  if (!localStorage.access_token && context.route.path != "/Account/Login") {
    context.redirect("/Account/Login");
  } else {
    return $auth.init();
  }
}
