import {
    Button,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components'
import { DialogTriggerProps } from '@radix-ui/react-dialog'
import React from 'react'

const LearnMoreDialog = ({
    onClose,
}: {
    onClose?: DialogTriggerProps['onClick']
}) => {
    return (
    <Dialog>

        <DialogTrigger asChild onClick={onClose}>
        <Button className='text-xs md:text-base'>Learn More</Button>
        </DialogTrigger>

        <DialogContent className='sm:max-w-[730px]'>

        <DialogHeader>
            <DialogTitle className='text-2xl'>More on Django India</DialogTitle>
            <DialogDescription>
            For the Community by the Community
            </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Exclusive Project Updates
                </h6>
                <p className='text-sm'>
                Dive deep into the most exciting Django projects happening around!
                Stay informed about initiatives, cutting-edge features, and key updates.
                Discover how you can get involved, contribute your skills,
                and be part of building something remarkable with the Django community.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Newsletters
                </h6>
                <p className='text-sm'>
                Never miss an update on the latest trends, tools, and features
                in the Django ecosystem. Our newsletters keep you informed about
                what is happening in the Django world.whether it’s a major release,
                noteworthy developments in India,
                or international innovations shaping the future of web development.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Community Events
                </h6>
                <p className='text-sm'>
                Join a vibrant community of Django developers through our meetups, webinars, and virtual hangouts.
                Learn from experts, share your experiences, and connect with like-minded enthusiasts
                across India and beyond. Be the first to hear about our upcoming events,
                where you can network, learn, and grow your Django skills.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Spotlight on Contributions
                </h6>
                <p className='text-sm'>
                Celebrate the amazing work being done by Indian developers in the Django community!
                We’ll regularly highlight contributions that are making an impact,
                offering inspiration and recognition to developers pushing boundaries.
                Who knows, your next pull request might be the one that gets featured!
                </p>
            </div>
        </div>

        </DialogContent>
    </Dialog>
    )
}

export default LearnMoreDialog
