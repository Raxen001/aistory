"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function Form() {
  const [text, setText] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Text:", text);
    console.log("File:", file);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <Card className="border-zinc-800 bg-zinc-900/30 backdrop-blur-xl shadow-2xl">
          <CardHeader className="border-b border-zinc-800">
            <CardTitle className="text-2xl font-bold text-center bg-gradient-to-r from-gray-100 to-gray-400 bg-clip-text text-transparent">
              AI STORY GEN
            </CardTitle>
          </CardHeader>
          <CardContent className="mt-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="text" className="text-zinc-400 text-sm">
                  Your Story Prompt
                </Label>
                <Textarea
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter your story prompt here..."
                  className="bg-zinc-900 border-zinc-800 text-zinc-100 placeholder:text-zinc-600 focus-visible:ring-zinc-700 focus-visible:ring-offset-zinc-900 h-32 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="file" className="text-zinc-400 text-sm">
                  E-Pub
                </Label>
                <Input
                  id="file"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  className="bg-zinc-900 border-zinc-800 text-zinc-100 file:bg-zinc-800 file:text-zinc-100 file:border-0 file:mr-4 file:px-4 file:py-2 hover:file:bg-zinc-700 focus-visible:ring-zinc-700 focus-visible:ring-offset-zinc-900 pb-11"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-zinc-800 text-zinc-100 hover:bg-zinc-700 font-medium"
              >
                Generate Story
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
