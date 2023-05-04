import prisma from "@/app/libs/prismadb";

export interface IListingsParams {
  userId?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: IListingsParams) {
  try {
    const {
      userId,
      roomCount,
      guestCount,
      bathroomCount,
      locationValue,
      startDate,
      endDate,
      category,
    } = params;
    let query = {};

    if (userId) {
      //@ts-ignore
      query.userId = userId;
    }
    if (category) {
      //@ts-ignore
      query.category = category;
    }

    if (roomCount) {
      //@ts-ignore
      query.roomCount = {
        gte: +roomCount,
      };
    }

    if (guestCount) {
      //@ts-ignore
      query.guestCount = {
        gte: +guestCount,
      };
    }

    if (bathroomCount) {
      //@ts-ignore
      query.bathroomCount = {
        gte: +bathroomCount,
      };
    }

    if (locationValue) {
      //@ts-ignore
      query.locationValue = locationValue;
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    if (startDate && endDate) {
      //@ts-ignore
      query.NOT = {
        reservations: {
          some: {
            OR: [
              {
                endDate: { gte: startDate },
                startDate: { lte: startDate },
              },
              {
                startDate: { lte: endDate },
                endDate: { gte: endDate },
              },
            ],
          },
        },
      };
    }

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (err: any) {
    throw new Error(err);
  }
}
