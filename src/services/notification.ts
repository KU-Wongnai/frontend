import { httpClient } from "@/lib/http-client";

// email part
export const getUserEmailWelcome = async (toEmail : string) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/welcome/user/email/${toEmail}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get user email welcome", error);
      throw error;
    }
};

export const getRiderEmailWelcome = async (toEmail : string) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/welcome/rider/email/${toEmail}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get rider email welcome", error);
      throw error;
    }
};

export const getRestaurantEmailWelcome = async (toEmail : string) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/welcome/restaurant/email/${toEmail}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get restaurant email welcome", error);
      throw error;
    }
};

export const getResetPasswordEmail = async (toEmail : string) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/reset-password/email/${toEmail}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get email reset-password", error);
      throw error;
    }
};



// --------------------------------------------------------------
// In app part

// User review part
export const getUserNotiWelcome = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/user/noti/welcome/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get user noti welcome", error);
      throw error;
    }
};


export const getUserNotiReviewReplied = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/user/noti/review-has-replied/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get user noti review replied", error);
      throw error;
    }
};


export const getUserNotiReviewNewFollower = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/user/noti/review-new-follower/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get user noti review new follower", error);
      throw error;
    }
};


export const getUserNotiReviewWeek = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/user/noti/review-weekly-challenge/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get user noti review week", error);
      throw error;
    }
};


export const getUserNotiThank = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/user/noti/thank/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get user noti thank", error);
      throw error;
    }
};


export const getUserNotiDeliveryOrder = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/user/noti/delivery-Order/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get user noti delivery order", error);
      throw error;
    }
};


export const getUserNotiDeliveryWait = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/user/noti/delivery-wait/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get user noti delivery wait", error);
      throw error;
    }
};


export const getUserNotiDeliveryFinish = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/user/noti/delivery-finished/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get user noti delivery finish", error);
      throw error;
    }
};


export const getUserNotiDeliveryRemindReview = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/user/noti/delivery-remind-review/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get user noti delivery remind review", error);
      throw error;
    }
};


export const getUserNotiDeliveryReorder = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/user/noti/delivery-reorder/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get user noti delivery reorder", error);
      throw error;
    }
};

// rider part

export const getRiderNotiWelcome = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/rider/noti/welcome/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get rider noti welcome", error);
      throw error;
    }
};


export const getRiderNotiNewOrder = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/rider/noti/new-order/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get rider noti new order", error);
      throw error;
    }
};


export const getRiderNotiOrderOnWay = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/rider/noti/order-on-way/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get rider noti order-on-way", error);
      throw error;
    }
};


export const getRiderNotiOrderFinish = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/rider/noti/order-finished/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get rider noti order-finished", error);
      throw error;
    }
};


export const getRiderNotiSafety = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/rider/noti/safety-reminder/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get rider noti safety-reminder", error);
      throw error;
    }
};


export const getRiderNotiThank = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/rider/noti/thank/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get rider noti thank", error);
      throw error;
    }
};

// Restaurant part

export const getRestaurantNotiWelcome = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/restaurant/noti/welcome/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get restaurant noti welcome", error);
      throw error;
    }
};

export const getRestaurantNotiHasReview = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/restaurant/noti/has-review/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get restaurant noti has-review", error);
      throw error;
    }
};

// all notifcation
export const getAllNotification = async (id : number) => {
    try {
      const { data: notifications } = await httpClient.get(
        `noti/api/notifications/${id}`
      );
      return notifications;
    } catch (error) {
      console.error("Failed to get all notification of user id", error);
      throw error;
    }
};


export const markAsRead = async (userId : number, notiId : number) => {
  try {
    const { data: notifications } = await httpClient.post(
        `noti/api/notifications/${userId}/mark-as-read/${notiId}`
    );
    return notifications;
  } catch (error) {
    console.error("Failed to markAsRead notification", error);
    throw error;
  }
}

