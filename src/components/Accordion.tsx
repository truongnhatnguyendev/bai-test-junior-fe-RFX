import React, { ReactNode } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink, ChevronRight } from "lucide-react";

type AccordionProps = {
  icon: ReactNode;
  title: string;
  showChevron?: boolean;
  showExternalLink?: boolean;
  tooltipContent?: string;
  isShowContent?: boolean;
};

export const Accordion = ({
  icon,
  title,
  showChevron = false,
  showExternalLink = false,
  tooltipContent,
  isShowContent = false,
  ...props
}: AccordionProps & React.PropsWithChildren) => {
  return (
    <div>
      <div className="flex items-center justify-between border-b py-2">
        <div className="flex items-center text-[#7C7C7C] gap-2">
          {icon}
          <h2 className="text-base font-medium">{title}</h2>
          {showChevron && (
            <ChevronRight
              size={16}
              className={`${isShowContent ? "rotate-90" : ""}`}
            />
          )}
        </div>

        {showExternalLink &&
          (tooltipContent ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <ExternalLink
                  size={16}
                  className="text-blue-600 hover:text-[#7c7c7c] cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent className="bg-[#111928]">
                {tooltipContent}
              </TooltipContent>
            </Tooltip>
          ) : (
            <ExternalLink
              size={16}
              className="text-blue-600 hover:text-[#7c7c7c] cursor-pointer"
            />
          ))}
      </div>
      {isShowContent && props.children}
    </div>
  );
};
