import React from "react";
import Heading from "./Heading";
import Card from "./Card";
import Button from "./button";
import Link from "next/link";

type mainProp = {
  fragment: {
    id: any;
    productName: string;
    productImages: string;
    productPrice: string;
    cancelledProductPrice: string;
    latest: boolean;
  }[];
};

export default function Arrivals({ fragment }: mainProp) {
  //* custom comparator function for sort(a, b).
  //* used it later in the code. at 42.
  return (
    <>
      <div className="mt-24 flex flex-col gap-14">
        <div className="flex w-full justify-between items-center">
          <Heading
            message="Newest Arrivals"
            secondaryMessage="NUVANTE'S ORIGINALS"
          ></Heading>
          {/* <Link href="/Products">
            <Button text="View All" width={130}></Button>
          </Link> */}
        </div>
        <div className="flex flex-col gap-12 w-fit mx-auto">
          <div className="cards flex flex-wrap gap-x-6 sm:w-auto justify-center w-[100%] gap-y-10">
            {fragment.map((product, index) => (
              <Card
                id={product.id}
                key={index}
                productName={product.productName}
                productPrice={Number(product.productPrice)}
                cancelledPrice={Number(product.cancelledProductPrice)}
                src={product.productImages[0]}
                status={product.latest ? "new" : "old"}
              ></Card>
            ))}
          </div>
          <Link href="/Products" className="mx-auto w-fit">
            <Button text="View All Products" width={220}></Button>
          </Link>
        </div>
      </div>
    </>
  );
}
