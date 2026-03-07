"use client";

import { useEffect, useState } from "react";
import { Save, Loader2, Globe, Lock } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { useMyProfile, useUpdateProfile } from "@/hooks/useProfile";

export default function ProfileForm() {
  const { data: profile, isLoading } = useMyProfile();
  const updateProfile = useUpdateProfile();

  const [name, setName] = useState("");
  const [headline, setHeadline] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (profile) {
      setName(profile.name || "");
      setHeadline(profile.headline || "");
      setBio(profile.bio || "");
      setLocation(profile.location || "");
      setIsPublic(profile.isProfilePublic ?? true);
    }
  }, [profile]);

  async function handleSave() {
    setSaved(false);
    await updateProfile.mutateAsync({
      name: name || undefined,
      headline: headline || undefined,
      bio: bio || undefined,
      location: location || undefined,
      isProfilePublic: isPublic,
    });
    setSaved(true);
  }

  if (isLoading) {
    return <div className="h-48 animate-pulse rounded-lg bg-celestial-800/30" />;
  }

  return (
    <div className="rounded-lg border border-gold-700/20 bg-celestial-800/30 p-6">
      <h2
        className="mb-4 text-lg font-semibold text-parchment-200"
        style={{ fontFamily: "var(--font-cinzel)" }}
      >
        Public Profile
      </h2>
      <div className="space-y-4">
        <div>
          <label className="mb-1 block text-xs text-parchment-500">Display Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={50}
            placeholder="Your display name"
            className="w-full rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-parchment-500">Headline</label>
          <input
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            maxLength={100}
            placeholder="e.g. ZWDS Practitioner | Feng Shui Consultant"
            className="w-full rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 flex items-center justify-between text-xs text-parchment-500">
            <span>Bio</span>
            <span className={bio.length > 180 ? "text-quantum-red" : ""}>{bio.length}/200</span>
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={200}
            rows={3}
            placeholder="Tell the community about yourself..."
            className="w-full resize-none rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs text-parchment-500">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            maxLength={100}
            placeholder="e.g. Singapore"
            className="w-full rounded-md border border-gold-700/30 bg-celestial-700/50 px-3 py-2 text-sm text-parchment-200 focus:border-gold-500/50 focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPublic ? (
              <Globe className="h-4 w-4 text-quantum-green" />
            ) : (
              <Lock className="h-4 w-4 text-parchment-600" />
            )}
            <span className="text-sm text-parchment-400">
              {isPublic ? "Profile is public" : "Profile is private"}
            </span>
          </div>
          <button
            onClick={() => setIsPublic(!isPublic)}
            className={`relative h-6 w-11 rounded-full transition-colors ${isPublic ? "bg-quantum-green/40" : "bg-celestial-700"}`}
          >
            <span
              className={`absolute top-0.5 h-5 w-5 rounded-full bg-parchment-200 transition-transform ${isPublic ? "left-5.5" : "left-0.5"}`}
            />
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={handleSave} disabled={updateProfile.isPending} size="sm">
            {updateProfile.isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Profile
          </Button>
          {saved && <span className="text-xs text-quantum-green">Saved!</span>}
        </div>
      </div>
    </div>
  );
}
