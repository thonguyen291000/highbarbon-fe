export const TRACK_EVENT_NAMES = {
  TRACK_CLICK_ON_CITY: (city: string) => city,
  TRACK_CLICK_ON_BRANCH: (branch: string) => branch,
  TRACK_LEAVE_PHONE_RECALL_BRANCH: (branch: string, phone: string) =>
    `Gọi lại ở ${branch} với số điện thoại ${phone}`,
} as const;
