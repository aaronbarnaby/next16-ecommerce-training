# Demo Steps

The goal of this demo is to improve this codebase and enhance it with modern patterns on architecture, composition and caching to make it faster, more scalable and easier to maintain.

## Prop Drilling

The first issue with the code base is excessive prop drilling.

In the `app/page.tsx` file we are loading the session on the server

```ts
const loggedIn = await getIsAuthenticated();
```

This is then being drilled down into the components

```tsx
<WelcomeBanner loggedIn={loggedIn} />
<PersonalizedSection loggedIn={loggedIn} />
```

The first thing we can to is improve the `getIsAuthenticated()` method to prevent multiple calls
by wrapping the function in `cache(() => {});` By doing this we can call the function as many time as we need without worrying about performance issues.
We can move the code directly into the `PersonalizedSection` component as this is a server component already.

As for `WelcomeBanner` we need to handle this differently as this is a client component.
Lets start by moving up the tree back to the layout `app/layout.tsx`.
In here we can wrap our content with are already created `AuthProvider` we can then pass the promise response of `getIsAuthenticated` to this provider as we don't want to await the function here as it would block our whole application from loading.

Now we can return to the `PersonalBanner` in the `components/banner/WelcomeBanner.tsx` which previously was prop drilling the loading state and we can use the new `useAuth` hook here to load the on the client.
However because the loggedIn value from the hook is a promise we will need to handle with `use(Promise)` to let react this component will need to wait for the promise to resolve.
The lastly we can wrap the `PersonalBanner` with a `Suspense` with a fallback to prevent any content shift.

Now that are `WelcomeBanner` is more composable we can utilize it much more as such on the browse all page `app/all/page.tsx`.

## Excessive Client JS

The next issue is the excessive about of client side js.
Returning to the `WelcomeBanner` because of the `dismiss` feature the entire component has been made client side.
We can fix this by implementing the 'Donut Pattern' by creating a `BannerContainer` which is a client component taking the content of the old `WelcomeBanner` we can now update the `PersonalBanner` to server side and update the `WelcomeBanner` to wrap the suspense in the new `BannerContainer`.

## Dynamic Issue

At this point if we run a build we notice all pages are still currently building dynamiclly.

The main reason for this is the use of `UserProfile` in the layout header `features/user/components/UserProfile.tsx`.

The first thing we need to do is enable `cacheComponents` in the `next.config.ts` file.

Now by using `"use cache";` on components like the `Hero` banner we can prevent the need to suspend it as the server content will get cached making it pre-render into the static content store.

We can continue these improvements into the browse all page. we need to move the await on the search params into the `ProductList` this way we can Suspend it there preventing the blocking on the whole page.
Also updating the `CategoryFilters` to cached to remove the need for the Suspense boundary.

We can lastly look to improve the product pages. We can cache both the `Product` and `ProductDetails`.
However when caching the `ProductDetails` we will get a issue because we use the `SavedProduct` component which uses `getIsAuthenticated` which requires the `cookie()` function which cannot be cached for static rendering. the solution is we can introduce the donut pattern again to pass the `SavedProduct` componented from the server with a `Suspense` to prevent it page blocking.

Lastly to fix the issue because of the `params` await we can add the `generateStaticParams` function to pregenerate some sample pages.

Finally we have converted key element to optimize loading and performance, while doing this we have also made a range of our components more composable.
