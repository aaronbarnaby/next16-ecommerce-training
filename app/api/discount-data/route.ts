import { NextResponse } from 'next/server';
import { getCurrentAccount } from '@/features/auth/auth-queries';
import { getSavedProducts } from '@/features/product/product-queries';
import { getUserDiscounts } from '@/features/user/user-queries';
import { slow } from '@/utils/slow';

export async function GET() {
  await slow();

  try {
    const [account, discounts, savedProducts] = await Promise.all([
      getCurrentAccount(),
      getUserDiscounts(),
      getSavedProducts(),
    ]);

    return NextResponse.json({
      account: account || null,
      discounts: discounts || [],
      savedProducts: savedProducts || [],
    });
  } catch {
    return NextResponse.json(
      {
        account: null,
        discounts: [],
        error: 'Failed to fetch user data',
        savedProducts: [],
      },
      { status: 500 },
    );
  }
}
