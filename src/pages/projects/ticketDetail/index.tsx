import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  ArrowUp,
  ChevronDown,
  ChevronRight,
  Circle,
  ClipboardList,
} from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Link } from "react-router-dom";
import { Timeline } from "@/components/Timeline";

const TICKET_PROPERTIES = [
  {
    label: "Status",
    value: "In-Progress",
    color: "text-blue-600",
  },
  {
    label: "Priority",
    value: "Critical",
    color: "text-red-600",
  },
  {
    label: "Assignee",
    value: "Trangntt",
  },
  {
    label: "Type",
    value: "Bug",
  },
  {
    label: "Stated date",
    value: "2025-04-04",
  },
  {
    label: "Target date",
    value: "2025-04-04",
  },
];

const DESCRIPTION_ITEMS = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
];

export function TicketDetailPage() {
  return (
    <div className="flex flex-col h-full w-full p-2">
      {/* Breadcrumb */}
      <Breadcrumb className="py-5 w-full border-b">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/Project" className="hover:text-primary">
                Project
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/components" className="hover:text-primary">
                UrapidLoan Project
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>abc</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-4 space-y-4">
        {/* Main Content Area */}
        <div className="sm:col-span-10 col-span-12 space-y-5">
          {/* Description Section */}
          <SectionHeader
            icon={<ClipboardList size={16} />}
            title="Description"
          />
          <ul className="list-inside space-y-2 text-sm text-muted-foreground">
            {DESCRIPTION_ITEMS.map((item, index) => (
              <DescriptionItem key={index} text={item} />
            ))}
          </ul>
          <AddSubTicketButton />

          {/* Activity Section */}
          <SectionHeader icon={<ClipboardList size={16} />} title="Activity" />
          <Timeline />
          <CommentInput />
        </div>

        {/* Properties Sidebar */}
        <div className="sm:border-l border-l-0 space-y-4 sm:col-span-2 col-span-12">
          <PropertiesHeader />
          <div className="space-y-4 px-4">
            {TICKET_PROPERTIES.map((property) => (
              <PropertyRow
                key={property.label}
                label={property.label}
                value={property.value}
                color={property.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const SectionHeader = ({
  icon,
  title,
}: {
  icon: React.ReactNode;
  title: string;
}) => (
  <div className="font-normal leading-6 text-base border-b flex items-center gap-2 py-3 text-[#7C7C7C]">
    {icon}
    {title}
  </div>
);

const DescriptionItem = ({ text }: { text: string }) => (
  <li className="flex py-2 gap-2">
    <Circle className="text-primary w-2 h-2 mt-[6px] flex-shrink-0" />
    <span className="font-normal text-sm leading-5 tracking-normal">
      {text}
    </span>
  </li>
);

const AddSubTicketButton = () => (
  <div className="p-0 cursor-pointer h-auto text-primary text-sm hover:underline">
    + Add sub-tickets
  </div>
);

const CommentInput = () => (
  <div className="relative">
    <Textarea
      placeholder="Leave a comment ..."
      className="resize-none bg-[#ECECEC] h-[90px] focus-visible:ring-1 focus-visible:ring-primary"
    />
    <Button
      variant="ghost"
      size="sm"
      className="absolute bottom-2 right-2 hover:bg-transparent"
    >
      <ArrowUp className="text-primary" />
    </Button>
  </div>
);

const PropertiesHeader = () => (
  <div className="font-normal text-center justify-between leading-6 text-base border-b flex items-center gap-2 py-3 px-4 text-[#7C7C7C]">
    <div className="flex gap-2 items-center">
      Properties
      <ChevronDown size={16} />
    </div>
    <ChevronRight size={24} />
  </div>
);

const PropertyRow = ({
  label,
  value,
  color,
}: {
  label: string;
  value: string;
  color?: string;
}) => (
  <div className="grid grid-cols-2">
    <span className="text-[#7C7C7C]">{label}:</span>
    <div className="flex items-center gap-3">
      <ChevronDown size={12} className="text-[#7C7C7C]" />
      <span className={`font-medium ${color ?? "text-[#7C7C7C]"}`}>
        {value}
      </span>
    </div>
  </div>
);
