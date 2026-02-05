import { Badge } from "@/components/ui/badge";
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
import { getForms } from "../../services/form.service";


const tableData = [
  {
    id: "13f3fc2f-a699-4da4-976d-3e2eb35ce128",
    title: "Onboarding Client - Standard",
    createdBy: "rida",
    createdAt: "05-02-2026",
    version: 1,
    status: "PUBLISHED",
    schema: [
      {
        type: "text",
        title: "Full Name",
        placeholder: "Ex: Jean Dupont",
        conditions: { maxLength: 50, minLength: 3, required: true },
        options: []
      },
      {
        type: "email",
        title: "Professional Email",
        placeholder: "contact@company.com",
        conditions: { required: true },
        options: []
      }
    ]
  },
  {
    id: "6eee8247-1a68-4292-95c5-55b4fdeed592",
    title: "Sondage Satisfaction Q4",
    createdBy: "admin_sarah",
    createdAt: "12-12-2025",
    version: 0,
    status: "DRAFT",
    schema: [
      {
        type: "number",
        title: "Note globale",
        placeholder: "0 à 10",
        conditions: { minLength: 0, maxLength: 10, required: true },
        options: []
      },
      {
        type: "checkbox",
        title: "Services utilisés",
        placeholder: null,
        conditions: { minSelect: 1 },
        options: ["Support", "Ventes", "Logistique", "Formation"]
      }
    ]
  },
  {
    id: "a2b3c4d5-e6f7-4g8h-9i0j-k1l2m3n4o5p6",
    title: "Formulaire de Recrutement Senior",
    createdBy: "marc_hr",
    createdAt: "20-01-2026",
    version: 3,
    status: "CLOSED",
    schema: [
      {
        type: "select",
        title: "Expérience (années)",
        placeholder: "Sélectionnez une tranche",
        conditions: { required: true },
        options: ["1-3 ans", "3-5 ans", "5-10 ans", "10+ ans"]
      },
      {
        type: "textarea",
        title: "Lettre de motivation",
        placeholder: "Décrivez votre parcours...",
        conditions: { maxLength: 2000, required: true },
        options: []
      }
    ]
  },
  {
    id: "z9y8x7w6-v5u4-t3s2-r1q0-p9o8n7m6l5k4",
    title: "Test Architecture (Ancien)",
    createdBy: "rida",
    createdAt: "15-05-2024",
    version: 2,
    status: "DELETED",
    schema: [
      {
        type: "text",
        title: "Legacy ID",
        placeholder: "ID interne",
        conditions: { required: false },
        options: []
      }
    ]
  },
  {
    id: "f1e2d3c4-b5a6-9876-5432-10fedcba9876",
    title: "Inscription Webinar IA",
    createdBy: "lucas_dev",
    createdAt: "02-02-2026",
    version: 1,
    status: "PUBLISHED",
    schema: [
      {
        type: "radio",
        title: "Niveau de connaissances",
        placeholder: null,
        conditions: { required: true },
        options: ["Débutant", "Intermédiaire", "Expert"]
      }
    ]
  }
];



export default function FormView() {
    const [forms, setForms] = useState([]);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        getForms().then(setForms);
    }, []);

    const formObject = tableData.find(data => data.id === id)

    return (
        <div>
            <header className="pb-5 flex justify-center items-center flex-col gap-2">
                <div className="text-6xl uppercase font-bold">Forms</div>

                <button className="border-2 border-black rounded-2xl shadow-2xl flex p-2"
                    onClick={() => navigate("/admin/forms/new")}>
                    <Plus/> Create New Form
                </button>
            </header>

            <Table className='bg-white/40 backdrop-blur-md border border-white/20 shadow-xl rounded-lg'>
                <TableHeader>
                    <TableRow>
                        <TableHead>Title</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>placeholder</TableHead>
                        <TableHead>conditions</TableHead>
                        <TableHead>options</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {formObject.schema.map((schema, idx) => 
                        (<TableRow key={idx}>
                            <TableCell >{schema.title}</TableCell>
                            <TableCell className="font-medium">{schema.type}</TableCell>
                            <TableCell>{schema.placeholder != null ? schema.placeholder : '-' }</TableCell>
                            <TableCell>
                                {
                                    Object.entries(schema.conditions).map(([key, value]) => (
                                        <Badge key={key}>{key + ' : ' + value}</Badge>
                                    ))
                                }
                            </TableCell>
                            <TableCell>
                                <ul >
                                    {
                                        schema.options.map((option) => (
                                            <li className="list-disc">{option}</li>
                                        ))
                                    }
                                </ul>
                            </TableCell>
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
