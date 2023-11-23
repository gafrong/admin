import {
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const statuses = [
  {
    value: "Ordered",
    label: "Ordered",
    icon: CircleIcon,
  },
  {
    value: "Processing",
    label: "Processing",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "In Delivery",
    label: "In Delivery",
    icon: StopwatchIcon,
  },
  {
    value: "Delivered",
    label: "Delivered",
    icon: CheckCircledIcon,
  },
  {
    value: "Cancel",
    label: "Cancel",
    icon: CrossCircledIcon,
  },
  {
    value: "Refunded",
    label: "Refunded",
    icon: CrossCircledIcon,
  },
];
