import supabase, { supabaseSession } from "./supabase";

export async function signUp({ email, password, phoneNumber }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: "http://localhost:5173/home",
      data: {
        phoneNumber,
        name: "",
        location: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function login({ email, password, remember }) {
  const Supabase = remember ? supabase : supabaseSession;

  const { data, error } = await Supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: sessionData } = await supabase.auth.getSession(); // Get from localStorage
  let session = sessionData?.session;

  if (!session) {
    const { data: sessionDataSession } =
      await supabaseSession.auth.getSession(); // Get from sessionStorage
    session = sessionDataSession?.session;
  }

  if (!session) return null;

  const supabaseClient = sessionData?.session ? supabase : supabaseSession;

  const { data, error } = await supabaseClient.auth.getUser();

  if (error) throw new Error(error.message);

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function signInWithProvider(provider, remember = true) {
  const Supabase = remember ? supabase : supabaseSession;

  const redirectUrl = import.meta.env.VITE_BASE_URL;

  const { data, error } = await Supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${redirectUrl}/auth/v1/callback`,
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function resendVerificationEmail(email) {
  const { data, error } = await supabase.auth.resend({
    type: "signup",
    email,
  });

  if (error) throw new Error(error.message);

  return data;
}
