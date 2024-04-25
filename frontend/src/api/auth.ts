export const googleAuth = async () => {
  try {
    window.location.href =
      "https://accounts.google.com/o/oauth2/v2/auth" +
      "?response_type=code" +
      "&client_id=1070310261194-8dkpov8j5n6rp2tm1gjnb76nkaohhc3t.apps.googleusercontent.com" +
      "&redirect_uri=http://localhost:3000/api/auth/google/callback" +
      "&scope=profile email";
  } catch (error) {
    throw new Response("Bad request", { status: 500 });
  }
};
