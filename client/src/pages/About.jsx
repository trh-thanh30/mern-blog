/* eslint-disable react/no-unescaped-entities */
export default function AboutPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-2xl p-3 mx-auto text-center">
        <div>
          <h1 className="text-3xl font-semibold text-center my-7">
            About HuuThanh's Blog
          </h1>
          <div className="flex flex-col gap-6 text-gray-500 text-md">
            <p>
              Welcome to HuuThanh's Blog! This blog was created by Tran Huu
              Thanh as a personal project to share his thoughts and ideas with
              the world. HuuThanh is a passionate developer who loves to write
              about technology, coding, and everything in between.
            </p>
            <p>
              On this blog, you'll find weekly articles and tutorials on topics
              such as web development, software engineering, and programming
              languages. Sahand is always learning and exploring new
              technologies, so be sure to check back often for new content
            </p>
            <p>
              We encourage you to leave comments on our posts and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of learners can help
              each other grow and improve.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
