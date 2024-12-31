import clientModel from "@/models/Clients";
import { NextResponse } from "next/server";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";

// Custom remove function with a filter logic.
// you could also do something like array.splice(0, array.indexOf(victim)).concat(array.indexOf(victim) + 1) (maybe)
function popElement(array: any[], victim: any) {
  const current = array.filter((element) => {
    return element != victim;
  });
  return current;
}

export async function POST(request: any) {
  const user = await currentUser();
  const global_user_email = user?.emailAddresses[0].emailAddress;
  try {
    const body = await request.json();
    const existingModel = await clientModel
      .findOne({
        email: global_user_email,
      })
      .then((data) => {
        return data;
      });

    if (body.append) {
      if (!existingModel.cart.includes(body.identifier)) {
        existingModel.cart.push(body.identifier);
      }
    } else {
      existingModel.cart = popElement(existingModel.cart, body.identifier);
    }
    await existingModel.save();
    return new NextResponse("200");
  } catch (error) {
    console.log(error);
    return new NextResponse("400");
  }
}
