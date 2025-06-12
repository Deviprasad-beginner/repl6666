import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import { Whisper, InsertWhisper } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, MessageCircle, Heart } from "lucide-react";

export default function Whispers() {
  const [isCreating, setIsCreating] = useState(false);
  const [content, setContent] = useState("");

  const { data: whispers = [], isLoading } = useQuery<Whisper[]>({
    queryKey: ['/api/whispers'],
  });

  const createWhisperMutation = useMutation({
    mutationFn: (newWhisper: InsertWhisper) => 
      apiRequest('/api/whispers', { 
        method: 'POST', 
        body: JSON.stringify(newWhisper) 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/whispers'] });
      setContent("");
      setIsCreating(false);
    },
  });

  const likeWhisperMutation = useMutation({
    mutationFn: (id: number) => 
      apiRequest(`/api/whispers/${id}/hearts`, { method: 'PATCH' }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/whispers'] });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim()) {
      createWhisperMutation.mutate({
        content: content.trim()
      });
    }
  };

  const handleLike = (id: number) => {
    likeWhisperMutation.mutate(id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-3xl font-bold">Whispers</h1>
            </div>
          </div>
          <Button 
            onClick={() => setIsCreating(!isCreating)}
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
          >
            {isCreating ? "Cancel" : "Share Whisper"}
          </Button>
        </div>

        <div className="mb-6 p-4 bg-indigo-900/30 rounded-lg border border-indigo-700/50">
          <p className="text-sm text-indigo-200">
            Whispers are anonymous thoughts shared in the safety of darkness. 
            Express what you cannot say in daylight.
          </p>
        </div>

        {/* Create Form */}
        {isCreating && (
          <Card className="mb-8 bg-gray-800/50 border-gray-700">
            <CardHeader>
              <CardTitle className="text-xl">Share Anonymous Whisper</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What weighs on your mind tonight?"
                    rows={4}
                    className="bg-gray-700/50 border-gray-600 text-white"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={!content.trim() || createWhisperMutation.isPending}
                  className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
                >
                  {createWhisperMutation.isPending ? "Sharing..." : "Share Whisper"}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Whispers List */}
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center text-gray-400 py-12">
              Loading whispers...
            </div>
          ) : whispers.length === 0 ? (
            <div className="text-center text-gray-400 py-12">
              <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl mb-2">No whispers yet</p>
              <p>Be the first to share an anonymous thought!</p>
            </div>
          ) : (
            whispers.map((whisper) => (
              <Card key={whisper.id} className="bg-gray-800/50 border-gray-700 hover:bg-gray-800/70 transition-colors">
                <CardContent className="p-6">
                  <p className="text-gray-200 leading-relaxed mb-4">{whisper.content}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">
                      {new Date(whisper.timestamp).toLocaleString()}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(whisper.id)}
                      disabled={likeWhisperMutation.isPending}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <Heart className="w-4 h-4 mr-1" />
                      {whisper.hearts || 0}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}