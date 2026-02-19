import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { MoreHorizontalIcon, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getAdminForms } from "../../services/form.service";

const tableData = [
  {
    id: 1,
    title: "Analyse de satisfaction client Q4",
    createdAt: "2024-03-15T10:30:00Z",
    createdBy: "JD",
    formName: "Enquête Qualité",
    status: "PUBLISHED",
    answers: [
      {
        questionId: "q1",
        questionTitle: "Note globale",
        value: "4/5"
      },
      {
        questionId: "q2",
        questionTitle: "Commentaires",
        value: "Excellent service, très réactif."
      }
    ]
  },
  {
    id: 2,
    title: "Retour d'expérience Beta Test",
    createdAt: "2024-03-12T14:15:00Z",
    createdBy: "EM",
    formName: "Feedback Produit",
    status: "DRAFT",
    answers: [
      {
        questionId: "q1",
        questionTitle: "Bug rencontré",
        value: "Problème d'affichage sur mobile."
      }
    ]
  },
  {
    id: 3,
    title: "Inscription séminaire annuel",
    createdAt: "2024-03-10T09:00:00Z",
    createdBy: "AL",
    formName: "RH - Événements",
    status: "CLOSED",
    answers: [
      {
        questionId: "q1",
        questionTitle: "Régime alimentaire",
        value: "Végétarien"
      }
    ]
  },
  {
    id: '9bbe3364-fb79-4ea0-91a1-fb336ce8ee10',
    title: "Sondage matériel bureau",
    createdAt: "2024-03-08T16:45:00Z",
    createdBy: "KB",
    formName: "Logistique interne",
    status: "DELETED",
    answers: [
      {
        questionId: "q1",
        questionTitle: "Besoin",
        value: "Double écran 27 pouces"
      }
    ]
  }
];



export default function AdminResponseView() {
    const [forms, setForms] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getAdminForms().then((value) => {
      setForms(value.list)
    });
    }, []);

    const response = tableData.find(data => data.id == id)

    return (
        <div>
            <header className="pb-5 flex justify-center items-center flex-col gap-2">
                <div className="text-6xl uppercase font-bold">Forms</div>

                <button className="border-2 border-black rounded-2xl shadow-2xl flex p-2"
                    onClick={() => navigate("/admin/forms/new")}>
                    <Plus/> Create New Form
                </button>
            </header>

            <Table className='bg-white/40 backdrop-blur-md border border-white/20 shadow-xl rounded-lg '>
                <TableHeader>
                    <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Value</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {response.answers.map(answer => 
                        (<TableRow key={answer.questionId}>
                            <TableCell className="font-medium">{answer.questionTitle}</TableCell>
                            <TableCell>{answer.value}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>)
                    )}
                </TableBody>
            </Table>
            {/* <ul>
                {forms.map(form => (
                    <li key={form.id}>
                        <strong>{form.title}</strong>

                        <div>
                            <button onClick={() => navigate(`/admin/forms/${form.id}/edit`)}>
                                Edit
                            </button>

                            <button onClick={() => navigate(`/admin/forms/${form.id}/responses`)}>
                                Responses
                            </button>
                        </div>
                    </li>
                ))}
            </ul> */}
        </div>
    );
}
