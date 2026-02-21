import React from 'react';
import { useGuestbook } from './hooks/useGuestbook';
import EntryForm from './components/guestbook/EntryForm';
import EntryList from './components/guestbook/EntryList';
import Stats from './components/guestbook/Stats';
import { Toaster } from 'react-hot-toast';

function App() {
  const {
    entries,
    stats,
    loading,
    hasMore,
    loadMore,
    createEntry,
    likeEntry,
  } = useGuestbook();

  return (
    <div className="min-h-screen bg-gradient-to-br from-genshin-dark via-purple-900 to-genshin-dark">
      {/* Decorative elements */}
      <div className="fixed top-20 left-10 text-6xl animate-float opacity-20">✨</div>
      <div className="fixed bottom-20 right-10 text-6xl animate-float opacity-20" style={{ animationDelay: '1s' }}>🌟</div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-genshin text-genshin-gold mb-4 animate-pulse-gold">
            Genshin Guestbook
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Leave your wishes for the Traveler to find on their journey across Teyvat!
          </p>
        </div>

        {/* Stats */}
        <div className="mb-12">
          <Stats stats={stats} />
        </div>

        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6 sticky top-24">
              <h2 className="text-2xl font-genshin text-genshin-gold mb-6">
                Leave a Message
              </h2>
              <EntryForm onSubmit={createEntry} loading={loading} />
            </div>
          </div>

          {/* Entries Section */}
          <div className="lg:col-span-2">
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-6">
              <h2 className="text-2xl font-genshin text-genshin-teal mb-6">
                Guestbook Entries ({entries.length})
              </h2>

              {loading && entries.length === 0 ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="card animate-pulse h-32" />
                  ))}
                </div>
              ) : (
                <EntryList
                  entries={entries}
                  onLike={likeEntry}
                  hasMore={hasMore}
                  onLoadMore={loadMore}
                  loading={loading}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;