import caseImage1 from '../../assets/images/landingPage/justicekoomebench.jpg';
import caseImage2 from '../../assets/images/landingPage/justicemaragabench.jpg';
import caseImage3 from '../../assets/images/landingPage/koomeandmwilu.jpeg';
import caseImage4 from '../../assets/images/landingPage/mwiluandkoome.jpg';

type TCaseCardData = {
    image: string;   // Image related to the case (could be related to the law firm or case type)
    caseTitle: string; // Title or name of the case
    clientName: string; // Client's name
    lawyerName: string; // Assigned lawyer's name
    status: 'open' | 'closed' | 'pending'; // Status of the case
}

export const CaseCardData: TCaseCardData[] = [
    {
        image: caseImage1,
        caseTitle: 'Civil Dispute: Smith vs. Johnson',
        clientName: 'John Smith',
        lawyerName: 'Jane Doe',
        status: 'open'
    },
    {
        image: caseImage2,
        caseTitle: 'Criminal Case: State vs. Jackson',
        clientName: 'Michael Jackson',
        lawyerName: 'John Connor',
        status: 'closed'
    },
    {
        image: caseImage3,
        caseTitle: 'Corporate Litigation: ABC Corp vs. XYZ Ltd.',
        clientName: 'ABC Corp',
        lawyerName: 'Emily White',
        status: 'pending'
    },
    {
        image: caseImage4,
        caseTitle: 'Family Law: Davis Divorce Case',
        clientName: 'Sarah Davis',
        lawyerName: 'James Brown',
        status: 'open'
    }
]
