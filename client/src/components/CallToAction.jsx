import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col items-center justify-center p-3 text-center border border-gray-600 border-solid dark:border-gray-400 sm:flex-row rounded-tl-3xl rounded-br-3xl">
      <div className="flex flex-col justify-center flex-1 ">
        <h2 className="text-2xl">Want to learn more about Next.js</h2>
        <p className="my-2 text-gray-500">Checkout these resources with 100 hours of Next.js content</p>
        <Button
          className="rounded-bl-none rounded-tl-xl"
          gradientDuoTone={"purpleToPink"}
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.udemy.com/course/master-nextjs-full-stack/?utm_source=adwords&utm_medium=udemyads&utm_campaign=LongTail_la.EN_cc.ROW&campaigntype=Search&portfolio=ROW-English&language=EN&product=Course&test=&audience=DSA&topic=&priority=&utm_content=deal4584&utm_term=_._ag_77879424134_._ad_535397279649_._kw__._de_c_._dm__._pl__._ti_dsa-1007766171312_._li_9074095_._pd__._&matchtype=&gad_source=1&gclid=CjwKCAjw4_K0BhBsEiwAfVVZ_3kHqH90lrJ-TYBsQ6wX6OG-Ib24xWWhDmIAHOtHJRC25Hj4MN0wPxoCEQwQAvD_BwE&couponCode=2021PM25"
          >
            Get started for the Next.js
          </a>
        </Button>
      </div>
      <div className="flex-1 p-7">
        <img
          src="https://media.licdn.com/dms/image/D4D12AQFJWfUQaQ1qPg/article-cover_image-shrink_600_2000/0/1675674296261?e=2147483647&v=beta&t=zcfSqc5__VRvgFu6e6Ll8vL4xNP_PYnbQYG4YpL9ysE"
          alt=""
        />
      </div>
    </div>
  );
}
