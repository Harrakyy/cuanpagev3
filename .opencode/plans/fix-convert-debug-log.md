# Fix: Improve Approve convert debug logging

## File
`app/admin/pesanan/[id]/page.tsx`

## Changes

### 1. `console.log` — use `JSON.stringify` instead of raw object

**Before:**
```ts
const payload = {
  agreed_price: Number(price),
  agreed_duration: duration ? Number(duration) : undefined,
  admin_notes: notes || undefined,
};
console.log("convert payload:", payload);
return postData(`/api/admin/orders/${params.id}/convert`, payload);
```

**After:**
```ts
console.log("convert payload:", JSON.stringify({
  agreed_price: Number(price),
  agreed_duration: duration ? Number(duration) : undefined,
  admin_notes: notes || undefined,
}));
return postData(`/api/admin/orders/${params.id}/convert`, {
  agreed_price: Number(price),
  agreed_duration: duration ? Number(duration) : undefined,
  admin_notes: notes || undefined,
});
```

### 2. `onError` — show actual backend response

**Before:**
```ts
onError: (error) => {
  const msg = (error as any)?.response?.data?.message || "Gagal Approve";
  toast.error(`❌ ${msg}`);
  console.error("convert error:", error);
},
```

**After:**
```ts
onError: (error: any) => {
  console.log("convert error detail:", error.response?.data);
  toast.error(error.response?.data?.message || "Gagal Approve");
},
```
