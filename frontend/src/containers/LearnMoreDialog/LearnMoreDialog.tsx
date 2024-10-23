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
        <DialogContent className='sm:max-w-[730px] max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
            <DialogTitle className='text-2xl'>About Django India</DialogTitle>
            <DialogDescription>
            For the Community, by the Community
            </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <div>
                <p className='text-sm'>
                    Django India is a vibrant and rapidly growing community dedicated to uniting developers,
                    enthusiasts, and technology professionals who share a deep passion for the Django framework.
                    Our community serves as a hub for individuals across the country who are excited to collaborate,
                    learn, and innovate together, no matter their experience level. Whether you&#39;re just starting
                    your journey into web development or are a seasoned professional, Django India is the perfect
                    place to connect with like-minded individuals and contribute to something larger.<br/><br/>

                    At the heart of Django India lies a strong commitment to fostering an inclusive and open environment.
                    We aim to make the Django ecosystem accessible to everyone by organizing a range of activities, from
                    technical meetups and hands-on workshops to online discussions and knowledge-sharing sessions. These
                    events are designed to not only help members build their technical skills but also to create a space
                    where lasting professional relationships can form. By providing both educational resources and
                    networking opportunities, we strive to be a key driver in the growth and success of Django within India.
                </p>
            </div>
            <h6 className='font-bold text-base inline-flex items-center gap-2 text-xl'>
                Our Community&#39;s Core Values:
            </h6>
            <div>
            <h6 className='font-bold '>
                Inclusivity:
                </h6>
                <p className='text-sm'>
                    At Django India, we are deeply committed to ensuring that the community is open,
                    welcoming, and inclusive to all. We believe that diversity is key to fostering innovation,
                    and we actively encourage participation from individuals of all backgrounds—regardless of
                    gender, ethnicity, location, or experience level. Everyone is welcome, from students and
                    hobbyists to seasoned developers and tech professionals. We aim to make Django accessible
                    to all by creating a space where every member can contribute meaningfully, learn from each
                    other, and feel a sense of belonging.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Collaboration:
                </h6>
                <p className='text-sm'>
                    We believe that the best way to grow as developers and professionals is by working together.
                    Our community emphasizes collaboration on open-source projects, joint learning initiatives,
                    and peer mentorship. Everyone has something valuable to contribute, and we encourage an
                    environment where members help one another to solve complex problems and build exciting projects.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Learning and Growth:
                </h6>
                <p className='text-sm'>
                    One of the key missions of Django India is to facilitate continuous learning.
                    We regularly host workshops, talks, and code-along sessions that cover a wide
                    range of topics within Django and beyond. Members are encouraged to stay up-to-date
                    with the latest developments in web technologies, share their knowledge, and apply
                    new skills in real-world scenarios.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Innovation:
                </h6>
                <p className='text-sm'>
                    At Django India, we don&#39;t just follow trends—we aim to set them. Our community is
                    constantly pushing the boundaries of what&#39;s possible with Django, experimenting
                    with new features, tools, and technologies. We encourage our members to take part
                    in cutting-edge projects, contribute to open-source development, and come up with
                    innovative solutions that can benefit the broader tech landscape.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                No-Code Contributions:
                </h6>
                <p className='text-sm'>
                    We understand that contributions to the Django community go beyond just writing code.
                    That&#39;s why we actively promote no-code contributions, allowing non-technical members
                    to play a vital role in the growth of the community. Whether it&#39;s through content creation,
                    event organizing, design, documentation, or social media advocacy, everyone can contribute
                    and make an impact. Django India embraces the philosophy that contributions come in many forms,
                    and all are equally valuable to the success of our community.
                </p>
            </div>
            <h6 className='font-bold text-base inline-flex items-center gap-2 text-xl'>
                What Django India Offers:
            </h6>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Meetups and Networking:
                </h6>
                <p className='text-sm'>
                    Django India regularly hosts meetups, both online and in-person, where members can connect,
                    share ideas, and collaborate. These events offer a chance to hear from expert speakers,
                    participate in lively discussions, and engage with the local developer community. Our in-person
                    meetups are held in various cities, offering a more localized and hands-on experience, while
                    online events help us reach members no matter where they&#39;re located.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Workshops and Skill Development:
                </h6>
                <p className='text-sm'>
                    Whether you&#39;re a beginner looking to understand the basics of Django or an advanced developer
                    aiming to dive deeper into specialized topics, Django India&#39;s workshops cater to all. These
                    workshops are led by experts who guide participants through various aspects of Django development,
                    providing real-world examples and practical insights that can be applied to your projects.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Open-Source Contributions:
                </h6>
                <p className='text-sm'>
                    Contributing to open-source software is a cornerstone of our community. Django India provides
                    a platform for members to engage in open-source projects, enabling them to collaborate on
                    meaningful contributions, code or no-code to the Django ecosystem. We encourage our members
                    to get involved, not only to improve their own skills but also to give back to the global
                    Django community.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Mentorship and Peer Support:
                </h6>
                <p className='text-sm'>
                    Growth in a community thrives on mentorship and support. At Django India, we actively promote a
                    culture of mentoring, where more experienced members are available to guide newcomers. This
                    ensures that everyone, regardless of where they are in their learning journey, has access to
                    the help they need to succeed.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2'>
                Continuous Learning:
                </h6>
                <p className='text-sm'>
                    We believe in lifelong learning and regularly share resources like tutorials, blogs, and code
                    repositories to keep our members at the forefront of Django and web development. Our community
                    fosters curiosity and encourages members to explore new frameworks, tools, and libraries that
                    complement Django.
                </p>
            </div>
            <div>
                <h6 className='font-bold text-base inline-flex items-center gap-2 text-xl'>
                Join the Movement:
                </h6>
                <p className='text-sm'>
                    Django India is more than just a community; it&#39;s a movement aimed at growing the Django ecosystem
                    in India and beyond. As we continue to expand, our focus remains on building a supportive,
                    innovative, and collaborative environment for developers of all levels. We encourage our members
                    to take part in everything we have to offer—whether it&#39;s by attending meetups, participating in
                    workshops, contributing to projects, or mentoring the next generation of Django developers.<br/><br/>
                    By becoming a member of Django India, you&#39;re joining a group of passionate individuals who are
                    excited about learning and building the future of web development together. We&#39;re proud of the
                    work we&#39;ve done so far, and we look forward to seeing how our community continues to evolve as we grow.
                </p>
            </div>
        </div>
        </DialogContent>
    </Dialog>
    )
}

export default LearnMoreDialog
