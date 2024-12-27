'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const isUsernameUnique = async (username: string): Promise<boolean> => {
  await new Promise(resolve => setTimeout(resolve, 1000))
  return !['taken', 'admin', 'user'].includes(username)
}

const saveProfileData = async () => {
  // In a real app, you would call an API to save the profile data
  // For now, we'll simulate saving the data
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Profile data saved:', { fullName, username, about, links, image });
  return true;
};

export default function CompleteProfilePage() {
  const [image, setImage] = useState<string | null>(null)
  const [fullName, setFullName] = useState('')
  const [username, setUsername] = useState('')
  const [about, setAbout] = useState('')
  const [links, setLinks] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const router = useRouter()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const validateForm = async (): Promise<boolean> => {
    const newErrors: { [key: string]: string } = {}

    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required'
    }

    if (!username.trim()) {
      newErrors.username = 'Username is required'
    } else {
      const isUnique = await isUsernameUnique(username)
      if (!isUnique) {
        newErrors.username = 'This username is already taken'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const isValid = await validateForm();

    if (isValid) {
      try {
        const saved = await saveProfileData();
        if (saved) {
          router.push('/');  // Redirect to home page
        } else {
          throw new Error('Failed to save profile data');
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "There was a problem updating your profile. Please try again.",
          variant: "destructive",
        });
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#A690F2] to-[#2C1761] p-4">
      <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-6 pt-8">
        <label className="block w-32 h-32 mx-auto rounded-full border-2 border-white/30 cursor-pointer hover:border-white/50 transition-colors">
          {image ? (
            <div className="relative w-full h-full rounded-full overflow-hidden">
              <Image
                src={image}
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="flex items-center justify-center w-full h-full text-center text-white/70 text-sm p-4">
              Click to upload an image
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </label>

        <Input
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Full Name"
          className="bg-transparent border-white/30 rounded-lg px-6 py-4 text-white placeholder:text-white/50 focus:border-white/50"
        />

        <Input
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="bg-transparent border-white/30 rounded-lg px-6 py-4 text-white placeholder:text-white/50 focus:border-white/50"
        />

        <Textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          placeholder="About me"
          className="bg-transparent border-white/30 rounded-lg px-6 py-4 text-white placeholder:text-white/50 focus:border-white/50 min-h-[120px] resize-none"
        />

        <Input
          value={links}
          onChange={(e) => {
            let input = e.target.value.toLowerCase()
            // Remove any existing protocol
            input = input.replace(/^(https?:\/\/)?(www\.)?/, '')
            // Add www. prefix if not present
            input = input.startsWith('www.') ? input : `www.${input}`
            setLinks(input)
          }}
          pattern="www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?(/\S*)?$"
          placeholder="www.example.com"
          className="bg-transparent border-white/30 rounded-lg px-6 py-4 text-white placeholder:text-white/50 focus:border-white/50"
        />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-transparent border border-white/30 rounded-lg px-8 py-2 text-white hover:bg-white/10 transition-colors"
          >
            {isLoading ? 'Saving...' : 'Complete Profile'}
          </Button>
        </div>
      </form>
    </div>
  )
}

