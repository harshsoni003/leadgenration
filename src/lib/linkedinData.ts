// Parse LinkedIn Sales Navigator CSV data
export interface LinkedInLead {
    companyIndustry: string;
    companyLocation: string;
    companyName: string;
    connectionType: string;
    firstName: string;
    id: string;
    jobTitle: string;
    lastName: string;
    location: string;
    openLink: string;
    pendingInvitation: string;
    premium: string;
    profileId: string;
    profilePictureUrl: string;
    profileUrl: string;
    salesNavigatorUrl: string;
    saved: string;
    viewed: string;
}

// Real LinkedIn Sales Navigator data from CSV
export const linkedInLeads: LinkedInLead[] = [
    {
        companyIndustry: "Financial Services",
        companyLocation: "Beverly Hills, California, United States",
        companyName: "PHOCIS Tech©",
        connectionType: "2",
        firstName: "Nate",
        id: "45318044",
        jobTitle: "Founding CEO",
        lastName: "C.",
        location: "West Hollywood, California, United States",
        openLink: "false",
        pendingInvitation: "false",
        premium: "false",
        profileId: "ACwAAAKzf5wBiwDV_AJShTKi9ZyH6IncoZ2kqGM",
        profilePictureUrl: "https://media.licdn.com/dms/image/v2/D5603AQGUx1B_CiKqYg/profile-displayphoto-scale_100_100/B56Zedz9dIHQAc-/0/1750699340012?e=1767225600&v=beta&t=UT6-H1JoMbzkgNZ873JYj_mr6cC7CndLtCTI8zxjd68",
        profileUrl: "https://www.linkedin.com/in/ACwAAAKzf5wBiwDV_AJShTKi9ZyH6IncoZ2kqGM",
        salesNavigatorUrl: "https://www.linkedin.com/sales/people/ACwAAAKzf5wBiwDV_AJShTKi9ZyH6IncoZ2kqGM,NAME_SEARCH,MVdA",
        saved: "false",
        viewed: "false"
    },
    {
        companyIndustry: "Software Development",
        companyLocation: "Irvine, California, United States",
        companyName: "Outset",
        connectionType: "2",
        firstName: "Daren",
        id: "4761048",
        jobTitle: "Chief Executive Officer (CEO)",
        lastName: "Lauda",
        location: "Irvine, California, United States",
        openLink: "false",
        pendingInvitation: "false",
        premium: "true",
        profileId: "ACwAAABIpdgBXhsxfumWg225s_C4hEYM0r028GA",
        profilePictureUrl: "https://media.licdn.com/dms/image/v2/C5603AQEQcujTXWYwSA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1633363685973?e=1767225600&v=beta&t=YgWJA5Q8Z51fGvrDCUp9y4SQTZ-I_4mFbiTkD8veQMk",
        profileUrl: "https://www.linkedin.com/in/ACwAAABIpdgBXhsxfumWg225s_C4hEYM0r028GA",
        salesNavigatorUrl: "https://www.linkedin.com/sales/people/ACwAAABIpdgBXhsxfumWg225s_C4hEYM0r028GA,NAME_SEARCH,lx0l",
        saved: "false",
        viewed: "false"
    },
    {
        companyIndustry: "Technology, Information and Internet",
        companyLocation: "",
        companyName: "Stealth AI Startup",
        connectionType: "2",
        firstName: "Sunil",
        id: "15384015",
        jobTitle: "CTO/CEO",
        lastName: "Sharma",
        location: "Aliso Viejo, California, United States",
        openLink: "false",
        pendingInvitation: "false",
        premium: "true",
        profileId: "ACwAAADqvc8BfzOX8CLBHdalcGsGlVelgkjEtyQ",
        profilePictureUrl: "https://media.licdn.com/dms/image/v2/D5603AQH6SvZAyMbpfg/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1712033879065?e=1767225600&v=beta&t=1KTqLWxCqTHbp-RkIqH6HfbVhOaoSh-eGyeHouj7LYw",
        profileUrl: "https://www.linkedin.com/in/ACwAAADqvc8BfzOX8CLBHdalcGsGlVelgkjEtyQ",
        salesNavigatorUrl: "https://www.linkedin.com/sales/people/ACwAAADqvc8BfzOX8CLBHdalcGsGlVelgkjEtyQ,NAME_SEARCH,baGm",
        saved: "false",
        viewed: "false"
    },
    {
        companyIndustry: "IT Services and IT Consulting",
        companyLocation: "Rolling Hills Estates, California, United States",
        companyName: "Ardas",
        connectionType: "2",
        firstName: "Andrii",
        id: "56954640",
        jobTitle: "CEO",
        lastName: "Ryzhokhin",
        location: "Los Angeles, California, United States",
        openLink: "false",
        pendingInvitation: "false",
        premium: "true",
        profileId: "ACwAAANlDxABn01sCEs6rOr2ri8ET4S91-7lao4",
        profilePictureUrl: "https://media.licdn.com/dms/image/v2/C4E03AQFXYDliUOIljw/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1523627254934?e=1767225600&v=beta&t=KifiZh35I1tjLD7qkhqulCn1Nlt4MDqCHGb-yWtaSIE",
        profileUrl: "https://www.linkedin.com/in/ACwAAANlDxABn01sCEs6rOr2ri8ET4S91-7lao4",
        salesNavigatorUrl: "https://www.linkedin.com/sales/people/ACwAAANlDxABn01sCEs6rOr2ri8ET4S91-7lao4,NAME_SEARCH,JC4r",
        saved: "false",
        viewed: "false"
    },
    {
        companyIndustry: "Telecommunications",
        companyLocation: "Long Beach, California, United States",
        companyName: "CommPros.org",
        connectionType: "2",
        firstName: "Youthea",
        id: "1511611",
        jobTitle: "Founder and Chairperson",
        lastName: "Pich",
        location: "Los Angeles Metropolitan Area",
        openLink: "true",
        pendingInvitation: "false",
        premium: "true",
        profileId: "ACwAAAAXELsBDVofDDJMPX3D5oaGf0XJraibkHw",
        profilePictureUrl: "https://media.licdn.com/dms/image/v2/D5603AQFFS0Ne6d1F9g/profile-displayphoto-shrink_200_200/B56ZYDQyunGcAY-/0/1743811456284?e=1767225600&v=beta&t=SSNAgQ4bbZe8F8tLqOn-yAkhN8RIWf7jmoxUxPnA4s4",
        profileUrl: "https://www.linkedin.com/in/ACwAAAAXELsBDVofDDJMPX3D5oaGf0XJraibkHw",
        salesNavigatorUrl: "https://www.linkedin.com/sales/people/ACwAAAAXELsBDVofDDJMPX3D5oaGf0XJraibkHw,NAME_SEARCH,2Pr1",
        saved: "false",
        viewed: "false"
    },
    {
        companyIndustry: "IT Services and IT Consulting",
        companyLocation: "Jersey City, New Jersey, United States",
        companyName: "Smart-Links Cabling Solutions",
        connectionType: "2",
        firstName: "Andrew",
        id: "1424146642",
        jobTitle: "CEO and Founder",
        lastName: "Wilson",
        location: "Beverly Hills, California, United States",
        openLink: "true",
        pendingInvitation: "false",
        premium: "true",
        profileId: "ACwAAFTiwNIBrzlmoz28pwsXxYqY4AGeCsFJIOE",
        profilePictureUrl: "https://media.licdn.com/dms/image/v2/D4D03AQGLZsa277TJEw/profile-displayphoto-scale_200_200/B4DZhPetAqG8Ac-/0/1753680106140?e=1767225600&v=beta&t=mdiay23YyuUuPOBBB_sx8rEL5qBSjA7GeEbOVN8KgQ0",
        profileUrl: "https://www.linkedin.com/in/ACwAAFTiwNIBrzlmoz28pwsXxYqY4AGeCsFJIOE",
        salesNavigatorUrl: "https://www.linkedin.com/sales/people/ACwAAFTiwNIBrzlmoz28pwsXxYqY4AGeCsFJIOE,NAME_SEARCH,iPkp",
        saved: "false",
        viewed: "false"
    },
    {
        companyIndustry: "Software Development",
        companyLocation: "Los Angeles, California, United States",
        companyName: "Korgi",
        connectionType: "2",
        firstName: "DMA (Donna Michelle)",
        id: "6413516",
        jobTitle: "Founder & CEO",
        lastName: "Anderson",
        location: "Santa Monica, California, United States",
        openLink: "false",
        pendingInvitation: "false",
        premium: "false",
        profileId: "ACwAAABh3MwBcQS1BhzmdqlAZTJioabczmyv0o8",
        profilePictureUrl: "https://media.licdn.com/dms/image/v2/D5603AQEocXXWku8olQ/profile-displayphoto-scale_400_400/B56Zf1hpQFHQAk-/0/1752170927593?e=1767225600&v=beta&t=CUVZNR2lQndFkRftpSEDAwwk2lFdgMJSW-Lzp7MQqjA",
        profileUrl: "https://www.linkedin.com/in/ACwAAABh3MwBcQS1BhzmdqlAZTJioabczmyv0o8",
        salesNavigatorUrl: "https://www.linkedin.com/sales/people/ACwAAABh3MwBcQS1BhzmdqlAZTJioabczmyv0o8,NAME_SEARCH,eD7Z",
        saved: "false",
        viewed: "false"
    },
    {
        companyIndustry: "Consumer Services",
        companyLocation: "Stanton, California, United States",
        companyName: "Loving The Plant",
        connectionType: "2",
        firstName: "Jessica",
        id: "453758803",
        jobTitle: "CEO / Business Advisor / Talent Monger",
        lastName: "Cox",
        location: "Los Angeles Metropolitan Area",
        openLink: "false",
        pendingInvitation: "false",
        premium: "false",
        profileId: "ACwAABsLz1MBl6BMuXbcP91CwwL4lkNMWEx0utg",
        profilePictureUrl: "https://media.licdn.com/dms/image/v2/D5603AQGdZaSMHxFaLw/profile-displayphoto-scale_200_200/B56ZrL61p0JUAY-/0/1764357793220?e=1767225600&v=beta&t=hsAF21EiK-wKd2xwH9mo1iEp5FyRbhVs4GkeYwCrVF4",
        profileUrl: "https://www.linkedin.com/in/ACwAABsLz1MBl6BMuXbcP91CwwL4lkNMWEx0utg",
        salesNavigatorUrl: "https://www.linkedin.com/sales/people/ACwAABsLz1MBl6BMuXbcP91CwwL4lkNMWEx0utg,NAME_SEARCH,U1x8",
        saved: "false",
        viewed: "false"
    },
    {
        companyIndustry: "Real Estate",
        companyLocation: "",
        companyName: "Hanora Investment Group",
        connectionType: "2",
        firstName: "Lawrence",
        id: "3518163",
        jobTitle: "Co-Founder",
        lastName: "Ng",
        location: "Los Angeles, California, United States",
        openLink: "true",
        pendingInvitation: "false",
        premium: "true",
        profileId: "ACwAAAA1rtMBFWcGE3xsmX9BsqQtoeXTVgsFouU",
        profilePictureUrl: "https://media.licdn.com/dms/image/v2/D5603AQHLjj-UY8TOuQ/profile-displayphoto-scale_200_200/B56ZhULRuzH0Ac-/0/1753758901508?e=1767225600&v=beta&t=JDnszy2yLLOG4KJj4cT9GDigZeWxS50g3TdeEZzGiuk",
        profileUrl: "https://www.linkedin.com/in/ACwAAAA1rtMBFWcGE3xsmX9BsqQtoeXTVgsFouU",
        salesNavigatorUrl: "https://www.linkedin.com/sales/people/ACwAAAA1rtMBFWcGE3xsmX9BsqQtoeXTVgsFouU,NAME_SEARCH,P7L4",
        saved: "false",
        viewed: "false"
    },
    {
        companyIndustry: "",
        companyLocation: "",
        companyName: "SparxWorks Inc.",
        connectionType: "2",
        firstName: "William",
        id: "14328145",
        jobTitle: "CEO",
        lastName: "Newell",
        location: "Redondo Beach, California, United States",
        openLink: "false",
        pendingInvitation: "false",
        premium: "true",
        profileId: "ACwAAADaoVEBbVwnVv3O4K77y7GpApjfPk9iDok",
        profilePictureUrl: "https://media.licdn.com/dms/image/v2/C5603AQFo8oJ4GpNBEQ/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1554221894299?e=1767225600&v=beta&t=15vlTH7eOmYBoM0otsQ__jkbJalzgtTCkdLMTIUgcaA",
        profileUrl: "https://www.linkedin.com/in/ACwAAADaoVEBbVwnVv3O4K77y7GpApjfPk9iDok",
        salesNavigatorUrl: "https://www.linkedin.com/sales/people/ACwAAADaoVEBbVwnVv3O4K77y7GpApjfPk9iDok,NAME_SEARCH,bwPI",
        saved: "false",
        viewed: "false"
    }
];

// Convert LinkedIn lead to app Lead format
export function convertToLead(linkedInLead: LinkedInLead, index: number): any {
    const fullName = `${linkedInLead.firstName} ${linkedInLead.lastName}`;
    const score = Math.floor(Math.random() * 30) + 70; // Random score 70-100

    return {
        id: parseInt(linkedInLead.id) || index,
        name: fullName,
        title: linkedInLead.jobTitle,
        company: linkedInLead.companyName,
        companySize: "11-50", // Default, can be enhanced
        location: linkedInLead.location,
        totalScore: score,
        followers: "2.5k", // Default, can be enhanced
        eventSignals: linkedInLead.companyIndustry ? [linkedInLead.companyIndustry] : [],
        status: score > 85 ? "Pending Review" : score > 75 ? "Approved" : "Rejected",
        avatar: linkedInLead.profilePictureUrl || undefined,
        profileUrl: linkedInLead.profileUrl,
        salesNavigatorUrl: linkedInLead.salesNavigatorUrl,
    };
}
