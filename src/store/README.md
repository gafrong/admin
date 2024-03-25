# Store

## SWR

Values fetched from the backend, are stored in the SWR cache

| value      | url                                  |
| ---------- | ------------------------------------ |
| orderItems | `orders/get/adminorders/${vendorId}` |
| questions  | `questions/vendor/${sellerId}`       |
| videos     | `videos/user/${userId}/videos`       |

## Zustand

Values derived from this backend data, are calculated from the SWR cache. This way they are always up-to-date.

If these derived values need to be used on another page, we can store them in
[zustand](./zustand.js).

Derived data in zustand:

- clients: derived from productItems, see `table-clients.jsx`
