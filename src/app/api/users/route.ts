import { userService } from "@/lib/core/service/user.service";
import { NextRequest, NextResponse } from "next/server";
import { authService } from "@/lib/core/service/auth.service";
import { validationAuth } from "../utils/handleValidation";

export async function GET(request: NextRequest) {
  try {
    const session = await validationAuth(request);

    if (!session.auth)
      return NextResponse.json(
        { message: "Error in authentication" },
        {
          status: 401,
        }
      );
    // todo return error validation role

    const responseValidations = await authService.validationAdmin(
      session.payload
    );
    if (!responseValidations.ok)
      return NextResponse.json(responseValidations.content, {
        status: responseValidations.statusCode,
      });

    // todo proccess logic
    const responseUser = await userService.findAll();

    return NextResponse.json(responseUser.content, {
      status: responseUser.statusCode,
    });
  } catch (error) {
    return NextResponse.json(error, {
      status: 500,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await validationAuth(request);

    if (!session.auth)
      return NextResponse.json(
        { message: "Error in authentication" },
        {
          status: 401,
        }
      );
    // todo return error validation role
    const responseValidations = await authService.validationAdmin(
      session.payload
    );
    if (!responseValidations.ok)
      return NextResponse.json(responseValidations.content, {
        status: responseValidations.statusCode,
      });

    const body = await request.json();

    // todo proccess logic
    const responseUser = await userService.createUser(body);

    return NextResponse.json(responseUser.content, {
      status: responseUser.statusCode,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(error, {
      status: 500,
    });
  }
}
