import {Skeleton} from "@/components/ui/skeleton";

function ProfileLoadingSkeleton() {
    return (
        <div>
            <div className="flex md:flex-row flex-col justify-center items-center md:justify-start md:items-start">
                <Skeleton className="rounded-xl w-24 h-24"/>
                <Skeleton className="text-xl md:text-2xl font-semibold md:ml-8 mt-8 md:mt-0"></Skeleton>
            </div>
            <div className="font-medium mt-4">Recent Activity</div>
            <Skeleton className="text-gray-400 mt-8 w-8"></Skeleton>
        </div>
    );
}

export default ProfileLoadingSkeleton;
