import { StatusComponent } from "@/components/StatusComponent";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Delete, Edit, MoreHorizontalIcon, Plus, Send, View } from "lucide-react";
import { useEffect, useState } from "react";
import ResponsivePagination from 'react-responsive-pagination';
import { combine, dropEllipsis, dropNav } from 'react-responsive-pagination/narrowBehaviour';
import { useNavigate } from "react-router";
import { getAdminForms } from "../../services/form.service";

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
        conditions: { min: 0, max: 10, required: true },
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




export default function AdminFormListPage() {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0)
  const [totalPages, setTotalPages] = useState(0)
  useEffect(() => {
    getAdminForms(currentPage, 10, 'createdAt').then((value) => {
      setForms(value.list)
      setCurrentPage(value.page)
      const totalItems = value.fullSize ? value.fullSize : 0
      const pageSize = value.size ? value.size : 10
      setTotalPages(totalItems / pageSize)
    });
  }, [currentPage]);

  return (
    <div>
      <header className="pb-5 flex justify-center items-center flex-col gap-2">
        <div className="text-6xl uppercase font-bold">Forms</div>

        <button className="border-2 border-black rounded-2xl shadow-2xl flex p-2"
          onClick={() => navigate("/admin/forms/new")}>
          <Plus /> Create New Form
        </button>
      </header>

      <Table className='bg-white/40 backdrop-blur-md border border-white/20 shadow-xl rounded-lg w-6xl'>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Version</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            forms.length ? forms.map(form =>
            (<TableRow key={form.id}>
              <TableCell className="font-medium">{form.title}</TableCell>
              <TableCell>{form.createdAt}</TableCell>
              <TableCell>{form.createdBy}</TableCell>
              <TableCell>v.{form.version}</TableCell>
              <TableCell><StatusComponent status={form.status} /></TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="size-8">
                      <MoreHorizontalIcon />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate("/admin/forms/" + form.id + "/view")}><View /> View</DropdownMenuItem>
                    <DropdownMenuItem><Edit /> Edit</DropdownMenuItem>
                    <DropdownMenuItem><Send /> Publish</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive">
                      <Delete /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>)
            ) :
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="text-center text-1xl p-5 italic">
                    Create a form to see it here !
                  </div></TableCell>
              </TableRow>
          }
        </TableBody>
      </Table>
      <ResponsivePagination
        total={totalPages}
        current={currentPage + 1}
        onPageChange={(value) => setCurrentPage(value - 1)}
        narrowBehaviour={combine(dropNav, dropEllipsis)}
        containerClassName="flex justify-center gap-1"
        pageItemClassName="inline-flex items-center rounded-md border text-sm"
        activeItemClassName="border-blue-800 bg-blue-800 text-white shadow-sm"
        inactiveItemClassName="border-slate-600 text-slate-400 shadow-sm hover:bg-blue-800 hover:text-white hover:shadow-lg"
        disabledItemClassName="pointer-events-none border-slate-600 text-slate-400 opacity-50"
        pageLinkClassName="px-3 py-2"
      />
    </div>
  );
}
