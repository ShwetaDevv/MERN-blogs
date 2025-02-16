import {  } from 'flowbite-react';

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 h-96 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <video className="w-full h-full object-cover rounded-tl-3xl rounded-br-3xl" autoPlay loop muted>
          <source
            src="https://media.istockphoto.com/id/1365307556/video/animation-of-virus-cells-floating-over-data-processing.mp4?s=mp4-640x640-is&k=20&c=_FyD08mWE_wFpbtbdqnf17mOy0P2JQP4ZHBQbD-gYeU=" // Replace with your programming video URL
          />
        </video>
      </div>
    </div>
  );
}
