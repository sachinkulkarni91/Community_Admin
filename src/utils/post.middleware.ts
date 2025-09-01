// Convert raw post data to a more usable format
const postCleaner= (allPosts: RawPost[] | RawShortPost[], user: User | null, community?: string, communityProfilePhoto?: string) : Post[] => {
  if (!user) return []
    console.log(allPosts)

  const modifiedPosts : Post[] = allPosts.map((p: RawPost | RawShortPost) => {
    const communityName = 'community' in p ? p.community.name : community;
    const communityProfilePhotoSrc = 'community' in p ? p.community.profilePhoto : communityProfilePhoto;
    if (!communityName) throw Error('invalid post type')
    if (!communityProfilePhotoSrc) throw Error('invalid post type')
    return {
        id: p.id,
        title: p.title,
        body: p.content,
        author: p.author.name,
        community: communityName,
        likes: p.likes.length,
        comments: p.comments.length,
        profilePhoto: p.author.profilePhoto,
        liked: p.likes.some(u => u.username === user?.username),
        time: findTimeDifference(p.createdAt),
        communityProfilePhoto: communityProfilePhotoSrc
  }})

  return modifiedPosts
}

// Find and format time since post was created
const findTimeDifference = (createdAt: string) : string => {
  const date = new Date(createdAt);
  const dateDiff = Date.now() - date.getTime()

  if (dateDiff >= 31536000000) return `${Math.round(dateDiff / 31536000000)}y ago`
  if (dateDiff >= 2592000000) return `${Math.round(dateDiff / 2592000000)}m ago`
  if (dateDiff >= 604800000) return `${Math.round(dateDiff / 604800000)}w ago`
  if (dateDiff >= 86400000) return `${Math.round(dateDiff / 86400000)}d ago`
  if (dateDiff >= 3600000) return `${Math.round(dateDiff / 3600000)}hr ago`
  if (dateDiff >= 60000) return `${Math.round(dateDiff / 60000)}min ago`
  return `just now`
}


export default postCleaner