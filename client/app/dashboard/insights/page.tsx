"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Line,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ComposedChart,
  Scatter,
  ScatterChart,
  ZAxis,
  ReferenceLine,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  Download,
  Target,
  Zap,
  Brain,
  BarChart3,
  Filter,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Trophy,
  Rocket,
  TrendingDown,
  Menu,
  X,
} from "lucide-react";
import { useState, useEffect } from "react";

// NEW DATA STRUCTURE
const expandedDummyData = {
  careerOptions: {
    "1month": [
      {
        career: "Data Scientist",
        demandIndex: 85,
        avgSalary: 95000,
        growthPercent: 5,
        openings: 1200,
      },
      {
        career: "Cloud Engineer",
        demandIndex: 80,
        avgSalary: 90000,
        growthPercent: 7,
        openings: 1100,
      },
      {
        career: "Web Developer",
        demandIndex: 75,
        avgSalary: 72000,
        growthPercent: 4,
        openings: 1500,
      },
      {
        career: "AI Specialist",
        demandIndex: 70,
        avgSalary: 115000,
        growthPercent: 6,
        openings: 700,
      },
      {
        career: "Cybersecurity Analyst",
        demandIndex: 68,
        avgSalary: 98000,
        growthPercent: 3,
        openings: 850,
      },
      {
        career: "DevOps Engineer",
        demandIndex: 92,
        avgSalary: 105000,
        growthPercent: 8,
        openings: 900,
      },
      {
        career: "Mobile Developer (iOS/Android)",
        demandIndex: 78,
        avgSalary: 88000,
        growthPercent: 5,
        openings: 1300,
      },
      {
        career: "UX/UI Designer",
        demandIndex: 65,
        avgSalary: 80000,
        growthPercent: 6,
        openings: 1050,
      },
      {
        career: "Blockchain Developer",
        demandIndex: 60,
        avgSalary: 125000,
        growthPercent: 12,
        openings: 450,
      },
      {
        career: "Embedded Systems Engineer",
        demandIndex: 55,
        avgSalary: 92000,
        growthPercent: 4,
        openings: 600,
      },
      {
        career: "Game Developer",
        demandIndex: 45,
        avgSalary: 75000,
        growthPercent: 5,
        openings: 1150,
      },
      {
        career: "Database Administrator (DBA)",
        demandIndex: 58,
        avgSalary: 85000,
        growthPercent: 2,
        openings: 950,
      },
      {
        career: "Technical Writer",
        demandIndex: 50,
        avgSalary: 65000,
        growthPercent: 3,
        openings: 1400,
      },
      {
        career: "Product Manager (Tech)",
        demandIndex: 88,
        avgSalary: 130000,
        growthPercent: 7,
        openings: 550,
      },
      {
        career: "QA Automation Engineer",
        demandIndex: 72,
        avgSalary: 82000,
        growthPercent: 6,
        openings: 1000,
      },
      {
        career: "ERP Consultant",
        demandIndex: 52,
        avgSalary: 100000,
        growthPercent: 3,
        openings: 750,
      },
      {
        career: "Network Engineer",
        demandIndex: 62,
        avgSalary: 87000,
        growthPercent: 4,
        openings: 800,
      },
      {
        career: "Augmented Reality Developer",
        demandIndex: 64,
        avgSalary: 98000,
        growthPercent: 10,
        openings: 500,
      },
      {
        career: "Salesforce Developer",
        demandIndex: 77,
        avgSalary: 94000,
        growthPercent: 5,
        openings: 900,
      },
      {
        career: "Scrum Master",
        demandIndex: 71,
        avgSalary: 102000,
        growthPercent: 4,
        openings: 650,
      },
    ],
    "3months": [
      {
        career: "Data Scientist",
        demandIndex: 83,
        avgSalary: 94000,
        growthPercent: 15,
        openings: 3500,
      },
      {
        career: "Cloud Engineer",
        demandIndex: 78,
        avgSalary: 89000,
        growthPercent: 18,
        openings: 3200,
      },
      {
        career: "Web Developer",
        demandIndex: 73,
        avgSalary: 71000,
        growthPercent: 10,
        openings: 4000,
      },
      {
        career: "AI Specialist",
        demandIndex: 68,
        avgSalary: 112000,
        growthPercent: 14,
        openings: 2100,
      },
      {
        career: "Cybersecurity Analyst",
        demandIndex: 66,
        avgSalary: 96000,
        growthPercent: 8,
        openings: 2500,
      },
      {
        career: "DevOps Engineer",
        demandIndex: 90,
        avgSalary: 104000,
        growthPercent: 20,
        openings: 2800,
      },
      {
        career: "Mobile Developer (iOS/Android)",
        demandIndex: 76,
        avgSalary: 87000,
        growthPercent: 15,
        openings: 3800,
      },
      {
        career: "UX/UI Designer",
        demandIndex: 63,
        avgSalary: 79000,
        growthPercent: 16,
        openings: 3100,
      },
      {
        career: "Blockchain Developer",
        demandIndex: 58,
        avgSalary: 122000,
        growthPercent: 28,
        openings: 1400,
      },
      {
        career: "Embedded Systems Engineer",
        demandIndex: 53,
        avgSalary: 91000,
        growthPercent: 12,
        openings: 1800,
      },
      {
        career: "Game Developer",
        demandIndex: 43,
        avgSalary: 74000,
        growthPercent: 15,
        openings: 3400,
      },
      {
        career: "Database Administrator (DBA)",
        demandIndex: 56,
        avgSalary: 84000,
        growthPercent: 6,
        openings: 2900,
      },
      {
        career: "Technical Writer",
        demandIndex: 48,
        avgSalary: 64000,
        growthPercent: 9,
        openings: 4100,
      },
      {
        career: "Product Manager (Tech)",
        demandIndex: 86,
        avgSalary: 128000,
        growthPercent: 18,
        openings: 1700,
      },
      {
        career: "QA Automation Engineer",
        demandIndex: 70,
        avgSalary: 81000,
        growthPercent: 16,
        openings: 3000,
      },
      {
        career: "ERP Consultant",
        demandIndex: 50,
        avgSalary: 99000,
        growthPercent: 8,
        openings: 2200,
      },
      {
        career: "Network Engineer",
        demandIndex: 60,
        avgSalary: 86000,
        growthPercent: 12,
        openings: 2400,
      },
      {
        career: "Augmented Reality Developer",
        demandIndex: 62,
        avgSalary: 97000,
        growthPercent: 25,
        openings: 1500,
      },
      {
        career: "Salesforce Developer",
        demandIndex: 75,
        avgSalary: 93000,
        growthPercent: 15,
        openings: 2700,
      },
      {
        career: "Scrum Master",
        demandIndex: 69,
        avgSalary: 101000,
        growthPercent: 10,
        openings: 1900,
      },
    ],
    "6months": [
      {
        career: "Data Scientist",
        demandIndex: 81,
        avgSalary: 93000,
        growthPercent: 25,
        openings: 7100,
      },
      {
        career: "Cloud Engineer",
        demandIndex: 76,
        avgSalary: 88000,
        growthPercent: 22,
        openings: 6500,
      },
      {
        career: "Web Developer",
        demandIndex: 72,
        avgSalary: 70000,
        growthPercent: 19,
        openings: 8100,
      },
      {
        career: "AI Specialist",
        demandIndex: 65,
        avgSalary: 110000,
        growthPercent: 26,
        openings: 4200,
      },
      {
        career: "Cybersecurity Analyst",
        demandIndex: 63,
        avgSalary: 94000,
        growthPercent: 17,
        openings: 4750,
      },
      {
        career: "DevOps Engineer",
        demandIndex: 88,
        avgSalary: 103000,
        growthPercent: 35,
        openings: 5700,
      },
      {
        career: "Mobile Developer (iOS/Android)",
        demandIndex: 74,
        avgSalary: 86000,
        growthPercent: 28,
        openings: 7500,
      },
      {
        career: "UX/UI Designer",
        demandIndex: 60,
        avgSalary: 78000,
        growthPercent: 25,
        openings: 6200,
      },
      {
        career: "Blockchain Developer",
        demandIndex: 55,
        avgSalary: 120000,
        growthPercent: 45,
        openings: 2800,
      },
      {
        career: "Embedded Systems Engineer",
        demandIndex: 50,
        avgSalary: 90000,
        growthPercent: 18,
        openings: 3700,
      },
      {
        career: "Game Developer",
        demandIndex: 40,
        avgSalary: 73000,
        growthPercent: 22,
        openings: 6900,
      },
      {
        career: "Database Administrator (DBA)",
        demandIndex: 53,
        avgSalary: 83000,
        growthPercent: 11,
        openings: 5800,
      },
      {
        career: "Technical Writer",
        demandIndex: 45,
        avgSalary: 63000,
        growthPercent: 15,
        openings: 8300,
      },
      {
        career: "Product Manager (Tech)",
        demandIndex: 84,
        avgSalary: 126000,
        growthPercent: 30,
        openings: 3400,
      },
      {
        career: "QA Automation Engineer",
        demandIndex: 68,
        avgSalary: 80000,
        growthPercent: 28,
        openings: 6000,
      },
      {
        career: "ERP Consultant",
        demandIndex: 47,
        avgSalary: 98000,
        growthPercent: 14,
        openings: 4400,
      },
      {
        career: "Network Engineer",
        demandIndex: 57,
        avgSalary: 85000,
        growthPercent: 20,
        openings: 4900,
      },
      {
        career: "Augmented Reality Developer",
        demandIndex: 59,
        avgSalary: 96000,
        growthPercent: 38,
        openings: 3000,
      },
      {
        career: "Salesforce Developer",
        demandIndex: 73,
        avgSalary: 92000,
        growthPercent: 25,
        openings: 5500,
      },
      {
        career: "Scrum Master",
        demandIndex: 67,
        avgSalary: 100000,
        growthPercent: 18,
        openings: 3800,
      },
    ],
    "1year": [
      {
        career: "Data Scientist",
        demandIndex: 79,
        avgSalary: 92000,
        growthPercent: 40,
        openings: 14500,
      },
      {
        career: "Cloud Engineer",
        demandIndex: 74,
        avgSalary: 87000,
        growthPercent: 38,
        openings: 13000,
      },
      {
        career: "Web Developer",
        demandIndex: 70,
        avgSalary: 69000,
        growthPercent: 35,
        openings: 16000,
      },
      {
        career: "AI Specialist",
        demandIndex: 63,
        avgSalary: 108000,
        growthPercent: 48,
        openings: 8600,
      },
      {
        career: "Cybersecurity Analyst",
        demandIndex: 61,
        avgSalary: 92000,
        growthPercent: 35,
        openings: 9700,
      },
      {
        career: "DevOps Engineer",
        demandIndex: 85,
        avgSalary: 102000,
        growthPercent: 55,
        openings: 11500,
      },
      {
        career: "Mobile Developer (iOS/Android)",
        demandIndex: 70,
        avgSalary: 85000,
        growthPercent: 40,
        openings: 15000,
      },
      {
        career: "UX/UI Designer",
        demandIndex: 57,
        avgSalary: 77000,
        growthPercent: 38,
        openings: 12400,
      },
      {
        career: "Blockchain Developer",
        demandIndex: 50,
        avgSalary: 118000,
        growthPercent: 65,
        openings: 5600,
      },
      {
        career: "Embedded Systems Engineer",
        demandIndex: 45,
        avgSalary: 89000,
        growthPercent: 25,
        openings: 7400,
      },
      {
        career: "Game Developer",
        demandIndex: 35,
        avgSalary: 72000,
        growthPercent: 30,
        openings: 13800,
      },
      {
        career: "Database Administrator (DBA)",
        demandIndex: 50,
        avgSalary: 82000,
        growthPercent: 18,
        openings: 11600,
      },
      {
        career: "Technical Writer",
        demandIndex: 40,
        avgSalary: 62000,
        growthPercent: 22,
        openings: 16600,
      },
      {
        career: "Product Manager (Tech)",
        demandIndex: 80,
        avgSalary: 124000,
        growthPercent: 45,
        openings: 6800,
      },
      {
        career: "QA Automation Engineer",
        demandIndex: 65,
        avgSalary: 79000,
        growthPercent: 40,
        openings: 12000,
      },
      {
        career: "ERP Consultant",
        demandIndex: 45,
        avgSalary: 97000,
        growthPercent: 20,
        openings: 8800,
      },
      {
        career: "Network Engineer",
        demandIndex: 54,
        avgSalary: 84000,
        growthPercent: 30,
        openings: 9800,
      },
      {
        career: "Augmented Reality Developer",
        demandIndex: 55,
        avgSalary: 95000,
        growthPercent: 55,
        openings: 6000,
      },
      {
        career: "Salesforce Developer",
        demandIndex: 70,
        avgSalary: 91000,
        growthPercent: 35,
        openings: 11000,
      },
      {
        career: "Scrum Master",
        demandIndex: 65,
        avgSalary: 99000,
        growthPercent: 25,
        openings: 7600,
      },
    ],
  },
  skillsComparison: {
    "1month": [
      {
        skill: "Python",
        DataScientist: 95,
        CloudEngineer: 75,
        WebDeveloper: 45,
        AISpecialist: 98,
        CybersecurityAnalyst: 70,
        DevOpsEngineer: 80,
        MobileDeveloper: 40,
        UXUIDesigner: 20,
        BlockchainDeveloper: 75,
        EmbeddedSystemsEngineer: 65,
        GameDeveloper: 50,
        DatabaseAdministrator: 70,
        TechnicalWriter: 30,
        ProductManager: 40,
        QAAutomationEngineer: 85,
        ERPConsultant: 55,
        NetworkEngineer: 60,
        AugmentedRealityDeveloper: 65,
        SalesforceDeveloper: 30,
        ScrumMaster: 45,
      },
      {
        skill: "AWS",
        DataScientist: 70,
        CloudEngineer: 95,
        WebDeveloper: 40,
        AISpecialist: 65,
        CybersecurityAnalyst: 90,
        DevOpsEngineer: 98,
        MobileDeveloper: 50,
        UXUIDesigner: 35,
        BlockchainDeveloper: 60,
        EmbeddedSystemsEngineer: 45,
        GameDeveloper: 30,
        DatabaseAdministrator: 65,
        TechnicalWriter: 25,
        ProductManager: 50,
        QAAutomationEngineer: 60,
        ERPConsultant: 40,
        NetworkEngineer: 75,
        AugmentedRealityDeveloper: 55,
        SalesforceDeveloper: 45,
        ScrumMaster: 50,
      },
      {
        skill: "JavaScript",
        DataScientist: 55,
        CloudEngineer: 60,
        WebDeveloper: 90,
        AISpecialist: 50,
        CybersecurityAnalyst: 40,
        DevOpsEngineer: 75,
        MobileDeveloper: 85,
        UXUIDesigner: 70,
        BlockchainDeveloper: 55,
        EmbeddedSystemsEngineer: 30,
        GameDeveloper: 60,
        DatabaseAdministrator: 40,
        TechnicalWriter: 35,
        ProductManager: 60,
        QAAutomationEngineer: 70,
        ERPConsultant: 35,
        NetworkEngineer: 45,
        AugmentedRealityDeveloper: 70,
        SalesforceDeveloper: 50,
        ScrumMaster: 55,
      },
      {
        skill: "Machine Learning",
        DataScientist: 94,
        CloudEngineer: 50,
        WebDeveloper: 35,
        AISpecialist: 99,
        CybersecurityAnalyst: 45,
        DevOpsEngineer: 55,
        MobileDeveloper: 35,
        UXUIDesigner: 25,
        BlockchainDeveloper: 40,
        EmbeddedSystemsEngineer: 40,
        GameDeveloper: 30,
        DatabaseAdministrator: 50,
        TechnicalWriter: 20,
        ProductManager: 65,
        QAAutomationEngineer: 50,
        ERPConsultant: 30,
        NetworkEngineer: 35,
        AugmentedRealityDeveloper: 60,
        SalesforceDeveloper: 25,
        ScrumMaster: 30,
      },
      {
        skill: "Network Security",
        DataScientist: 40,
        CloudEngineer: 70,
        WebDeveloper: 30,
        AISpecialist: 35,
        CybersecurityAnalyst: 94,
        DevOpsEngineer: 85,
        MobileDeveloper: 45,
        UXUIDesigner: 25,
        BlockchainDeveloper: 70,
        EmbeddedSystemsEngineer: 50,
        GameDeveloper: 30,
        DatabaseAdministrator: 60,
        TechnicalWriter: 20,
        ProductManager: 45,
        QAAutomationEngineer: 65,
        ERPConsultant: 40,
        NetworkEngineer: 95,
        AugmentedRealityDeveloper: 40,
        SalesforceDeveloper: 35,
        ScrumMaster: 40,
      },
      {
        skill: "Containers (Docker/K8s)",
        DataScientist: 60,
        CloudEngineer: 90,
        WebDeveloper: 65,
        AISpecialist: 55,
        CybersecurityAnalyst: 80,
        DevOpsEngineer: 99,
        MobileDeveloper: 55,
        UXUIDesigner: 40,
        BlockchainDeveloper: 70,
        EmbeddedSystemsEngineer: 30,
        GameDeveloper: 45,
        DatabaseAdministrator: 75,
        TechnicalWriter: 20,
        ProductManager: 70,
        QAAutomationEngineer: 80,
        ERPConsultant: 50,
        NetworkEngineer: 85,
        AugmentedRealityDeveloper: 45,
        SalesforceDeveloper: 30,
        ScrumMaster: 60,
      },
      {
        skill: "SQL",
        DataScientist: 90,
        CloudEngineer: 60,
        WebDeveloper: 50,
        AISpecialist: 65,
        CybersecurityAnalyst: 75,
        DevOpsEngineer: 70,
        MobileDeveloper: 50,
        UXUIDesigner: 30,
        BlockchainDeveloper: 60,
        EmbeddedSystemsEngineer: 60,
        GameDeveloper: 40,
        DatabaseAdministrator: 98,
        TechnicalWriter: 40,
        ProductManager: 65,
        QAAutomationEngineer: 85,
        ERPConsultant: 80,
        NetworkEngineer: 55,
        AugmentedRealityDeveloper: 30,
        SalesforceDeveloper: 70,
        ScrumMaster: 45,
      },
      {
        skill: "Agile/Scrum",
        DataScientist: 65,
        CloudEngineer: 70,
        WebDeveloper: 80,
        AISpecialist: 60,
        CybersecurityAnalyst: 65,
        DevOpsEngineer: 95,
        MobileDeveloper: 85,
        UXUIDesigner: 90,
        BlockchainDeveloper: 70,
        EmbeddedSystemsEngineer: 50,
        GameDeveloper: 80,
        DatabaseAdministrator: 60,
        TechnicalWriter: 70,
        ProductManager: 98,
        QAAutomationEngineer: 90,
        ERPConsultant: 95,
        NetworkEngineer: 70,
        AugmentedRealityDeveloper: 75,
        SalesforceDeveloper: 85,
        ScrumMaster: 99,
      },
    ],
    "3months": [
      {
        skill: "Python",
        DataScientist: 97,
        CloudEngineer: 78,
        WebDeveloper: 48,
        AISpecialist: 99,
        CybersecurityAnalyst: 73,
        DevOpsEngineer: 83,
        MobileDeveloper: 43,
        UXUIDesigner: 23,
        BlockchainDeveloper: 78,
        EmbeddedSystemsEngineer: 68,
        GameDeveloper: 53,
        DatabaseAdministrator: 73,
        TechnicalWriter: 33,
        ProductManager: 43,
        QAAutomationEngineer: 88,
        ERPConsultant: 58,
        NetworkEngineer: 63,
        AugmentedRealityDeveloper: 68,
        SalesforceDeveloper: 33,
        ScrumMaster: 48,
      },
      {
        skill: "AWS",
        DataScientist: 73,
        CloudEngineer: 97,
        WebDeveloper: 43,
        AISpecialist: 68,
        CybersecurityAnalyst: 92,
        DevOpsEngineer: 99,
        MobileDeveloper: 53,
        UXUIDesigner: 38,
        BlockchainDeveloper: 63,
        EmbeddedSystemsEngineer: 48,
        GameDeveloper: 33,
        DatabaseAdministrator: 68,
        TechnicalWriter: 28,
        ProductManager: 53,
        QAAutomationEngineer: 63,
        ERPConsultant: 43,
        NetworkEngineer: 78,
        AugmentedRealityDeveloper: 58,
        SalesforceDeveloper: 48,
        ScrumMaster: 53,
      },
      {
        skill: "JavaScript",
        DataScientist: 58,
        CloudEngineer: 63,
        WebDeveloper: 92,
        AISpecialist: 53,
        CybersecurityAnalyst: 43,
        DevOpsEngineer: 78,
        MobileDeveloper: 87,
        UXUIDesigner: 73,
        BlockchainDeveloper: 58,
        EmbeddedSystemsEngineer: 33,
        GameDeveloper: 63,
        DatabaseAdministrator: 43,
        TechnicalWriter: 38,
        ProductManager: 63,
        QAAutomationEngineer: 73,
        ERPConsultant: 38,
        NetworkEngineer: 48,
        AugmentedRealityDeveloper: 73,
        SalesforceDeveloper: 53,
        ScrumMaster: 58,
      },
      {
        skill: "Machine Learning",
        DataScientist: 96,
        CloudEngineer: 53,
        WebDeveloper: 38,
        AISpecialist: 100,
        CybersecurityAnalyst: 48,
        DevOpsEngineer: 58,
        MobileDeveloper: 38,
        UXUIDesigner: 28,
        BlockchainDeveloper: 43,
        EmbeddedSystemsEngineer: 43,
        GameDeveloper: 33,
        DatabaseAdministrator: 53,
        TechnicalWriter: 23,
        ProductManager: 68,
        QAAutomationEngineer: 53,
        ERPConsultant: 33,
        NetworkEngineer: 38,
        AugmentedRealityDeveloper: 63,
        SalesforceDeveloper: 28,
        ScrumMaster: 33,
      },
      {
        skill: "Network Security",
        DataScientist: 43,
        CloudEngineer: 73,
        WebDeveloper: 33,
        AISpecialist: 38,
        CybersecurityAnalyst: 96,
        DevOpsEngineer: 87,
        MobileDeveloper: 48,
        UXUIDesigner: 28,
        BlockchainDeveloper: 73,
        EmbeddedSystemsEngineer: 53,
        GameDeveloper: 33,
        DatabaseAdministrator: 63,
        TechnicalWriter: 23,
        ProductManager: 48,
        QAAutomationEngineer: 68,
        ERPConsultant: 43,
        NetworkEngineer: 97,
        AugmentedRealityDeveloper: 43,
        SalesforceDeveloper: 38,
        ScrumMaster: 43,
      },
      {
        skill: "Containers (Docker/K8s)",
        DataScientist: 63,
        CloudEngineer: 92,
        WebDeveloper: 68,
        AISpecialist: 58,
        CybersecurityAnalyst: 82,
        DevOpsEngineer: 100,
        MobileDeveloper: 58,
        UXUIDesigner: 43,
        BlockchainDeveloper: 73,
        EmbeddedSystemsEngineer: 33,
        GameDeveloper: 48,
        DatabaseAdministrator: 78,
        TechnicalWriter: 23,
        ProductManager: 73,
        QAAutomationEngineer: 82,
        ERPConsultant: 53,
        NetworkEngineer: 87,
        AugmentedRealityDeveloper: 48,
        SalesforceDeveloper: 33,
        ScrumMaster: 63,
      },
      {
        skill: "SQL",
        DataScientist: 92,
        CloudEngineer: 63,
        WebDeveloper: 53,
        AISpecialist: 68,
        CybersecurityAnalyst: 78,
        DevOpsEngineer: 73,
        MobileDeveloper: 53,
        UXUIDesigner: 33,
        BlockchainDeveloper: 63,
        EmbeddedSystemsEngineer: 63,
        GameDeveloper: 43,
        DatabaseAdministrator: 99,
        TechnicalWriter: 43,
        ProductManager: 68,
        QAAutomationEngineer: 88,
        ERPConsultant: 83,
        NetworkEngineer: 58,
        AugmentedRealityDeveloper: 33,
        SalesforceDeveloper: 73,
        ScrumMaster: 48,
      },
      {
        skill: "Agile/Scrum",
        DataScientist: 68,
        CloudEngineer: 73,
        WebDeveloper: 82,
        AISpecialist: 63,
        CybersecurityAnalyst: 68,
        DevOpsEngineer: 97,
        MobileDeveloper: 87,
        UXUIDesigner: 92,
        BlockchainDeveloper: 73,
        EmbeddedSystemsEngineer: 53,
        GameDeveloper: 82,
        DatabaseAdministrator: 63,
        TechnicalWriter: 73,
        ProductManager: 99,
        QAAutomationEngineer: 92,
        ERPConsultant: 97,
        NetworkEngineer: 73,
        AugmentedRealityDeveloper: 78,
        SalesforceDeveloper: 87,
        ScrumMaster: 100,
      },
    ],
    "6months": [
      {
        skill: "Python",
        DataScientist: 99,
        CloudEngineer: 81,
        WebDeveloper: 51,
        AISpecialist: 100,
        CybersecurityAnalyst: 76,
        DevOpsEngineer: 86,
        MobileDeveloper: 46,
        UXUIDesigner: 26,
        BlockchainDeveloper: 81,
        EmbeddedSystemsEngineer: 71,
        GameDeveloper: 56,
        DatabaseAdministrator: 76,
        TechnicalWriter: 36,
        ProductManager: 46,
        QAAutomationEngineer: 91,
        ERPConsultant: 61,
        NetworkEngineer: 66,
        AugmentedRealityDeveloper: 71,
        SalesforceDeveloper: 36,
        ScrumMaster: 51,
      },
      {
        skill: "AWS",
        DataScientist: 76,
        CloudEngineer: 99,
        WebDeveloper: 46,
        AISpecialist: 71,
        CybersecurityAnalyst: 94,
        DevOpsEngineer: 100,
        MobileDeveloper: 56,
        UXUIDesigner: 41,
        BlockchainDeveloper: 66,
        EmbeddedSystemsEngineer: 51,
        GameDeveloper: 36,
        DatabaseAdministrator: 71,
        TechnicalWriter: 31,
        ProductManager: 56,
        QAAutomationEngineer: 66,
        ERPConsultant: 46,
        NetworkEngineer: 81,
        AugmentedRealityDeveloper: 61,
        SalesforceDeveloper: 51,
        ScrumMaster: 56,
      },
      {
        skill: "JavaScript",
        DataScientist: 61,
        CloudEngineer: 66,
        WebDeveloper: 94,
        AISpecialist: 56,
        CybersecurityAnalyst: 46,
        DevOpsEngineer: 81,
        MobileDeveloper: 89,
        UXUIDesigner: 76,
        BlockchainDeveloper: 61,
        EmbeddedSystemsEngineer: 36,
        GameDeveloper: 66,
        DatabaseAdministrator: 46,
        TechnicalWriter: 41,
        ProductManager: 66,
        QAAutomationEngineer: 76,
        ERPConsultant: 41,
        NetworkEngineer: 51,
        AugmentedRealityDeveloper: 76,
        SalesforceDeveloper: 56,
        ScrumMaster: 61,
      },
      {
        skill: "Machine Learning",
        DataScientist: 98,
        CloudEngineer: 56,
        WebDeveloper: 41,
        AISpecialist: 100,
        CybersecurityAnalyst: 51,
        DevOpsEngineer: 61,
        MobileDeveloper: 41,
        UXUIDesigner: 31,
        BlockchainDeveloper: 46,
        EmbeddedSystemsEngineer: 46,
        GameDeveloper: 36,
        DatabaseAdministrator: 56,
        TechnicalWriter: 26,
        ProductManager: 71,
        QAAutomationEngineer: 56,
        ERPConsultant: 36,
        NetworkEngineer: 41,
        AugmentedRealityDeveloper: 66,
        SalesforceDeveloper: 31,
        ScrumMaster: 36,
      },
      {
        skill: "Network Security",
        DataScientist: 46,
        CloudEngineer: 76,
        WebDeveloper: 36,
        AISpecialist: 41,
        CybersecurityAnalyst: 98,
        DevOpsEngineer: 89,
        MobileDeveloper: 51,
        UXUIDesigner: 31,
        BlockchainDeveloper: 76,
        EmbeddedSystemsEngineer: 56,
        GameDeveloper: 36,
        DatabaseAdministrator: 66,
        TechnicalWriter: 26,
        ProductManager: 51,
        QAAutomationEngineer: 71,
        ERPConsultant: 46,
        NetworkEngineer: 99,
        AugmentedRealityDeveloper: 46,
        SalesforceDeveloper: 41,
        ScrumMaster: 46,
      },
      {
        skill: "Containers (Docker/K8s)",
        DataScientist: 66,
        CloudEngineer: 94,
        WebDeveloper: 71,
        AISpecialist: 61,
        CybersecurityAnalyst: 84,
        DevOpsEngineer: 100,
        MobileDeveloper: 61,
        UXUIDesigner: 46,
        BlockchainDeveloper: 76,
        EmbeddedSystemsEngineer: 36,
        GameDeveloper: 51,
        DatabaseAdministrator: 81,
        TechnicalWriter: 26,
        ProductManager: 76,
        QAAutomationEngineer: 84,
        ERPConsultant: 56,
        NetworkEngineer: 89,
        AugmentedRealityDeveloper: 51,
        SalesforceDeveloper: 36,
        ScrumMaster: 66,
      },
      {
        skill: "SQL",
        DataScientist: 94,
        CloudEngineer: 66,
        WebDeveloper: 56,
        AISpecialist: 71,
        CybersecurityAnalyst: 81,
        DevOpsEngineer: 76,
        MobileDeveloper: 56,
        UXUIDesigner: 36,
        BlockchainDeveloper: 66,
        EmbeddedSystemsEngineer: 66,
        GameDeveloper: 46,
        DatabaseAdministrator: 100,
        TechnicalWriter: 46,
        ProductManager: 71,
        QAAutomationEngineer: 91,
        ERPConsultant: 86,
        NetworkEngineer: 61,
        AugmentedRealityDeveloper: 36,
        SalesforceDeveloper: 76,
        ScrumMaster: 51,
      },
      {
        skill: "Agile/Scrum",
        DataScientist: 71,
        CloudEngineer: 76,
        WebDeveloper: 84,
        AISpecialist: 66,
        CybersecurityAnalyst: 71,
        DevOpsEngineer: 99,
        MobileDeveloper: 89,
        UXUIDesigner: 94,
        BlockchainDeveloper: 76,
        EmbeddedSystemsEngineer: 56,
        GameDeveloper: 84,
        DatabaseAdministrator: 66,
        TechnicalWriter: 76,
        ProductManager: 100,
        QAAutomationEngineer: 94,
        ERPConsultant: 99,
        NetworkEngineer: 76,
        AugmentedRealityDeveloper: 81,
        SalesforceDeveloper: 89,
        ScrumMaster: 100,
      },
    ],
    "1year": [
      {
        skill: "Python",
        DataScientist: 100,
        CloudEngineer: 84,
        WebDeveloper: 55,
        AISpecialist: 100,
        CybersecurityAnalyst: 80,
        DevOpsEngineer: 90,
        MobileDeveloper: 50,
        UXUIDesigner: 30,
        BlockchainDeveloper: 85,
        EmbeddedSystemsEngineer: 75,
        GameDeveloper: 60,
        DatabaseAdministrator: 80,
        TechnicalWriter: 40,
        ProductManager: 50,
        QAAutomationEngineer: 95,
        ERPConsultant: 65,
        NetworkEngineer: 70,
        AugmentedRealityDeveloper: 75,
        SalesforceDeveloper: 40,
        ScrumMaster: 55,
      },
      {
        skill: "AWS",
        DataScientist: 80,
        CloudEngineer: 100,
        WebDeveloper: 50,
        AISpecialist: 75,
        CybersecurityAnalyst: 96,
        DevOpsEngineer: 100,
        MobileDeveloper: 60,
        UXUIDesigner: 45,
        BlockchainDeveloper: 70,
        EmbeddedSystemsEngineer: 55,
        GameDeveloper: 40,
        DatabaseAdministrator: 75,
        TechnicalWriter: 35,
        ProductManager: 60,
        QAAutomationEngineer: 70,
        ERPConsultant: 50,
        NetworkEngineer: 85,
        AugmentedRealityDeveloper: 65,
        SalesforceDeveloper: 55,
        ScrumMaster: 60,
      },
      {
        skill: "JavaScript",
        DataScientist: 65,
        CloudEngineer: 70,
        WebDeveloper: 96,
        AISpecialist: 60,
        CybersecurityAnalyst: 50,
        DevOpsEngineer: 85,
        MobileDeveloper: 92,
        UXUIDesigner: 80,
        BlockchainDeveloper: 65,
        EmbeddedSystemsEngineer: 40,
        GameDeveloper: 70,
        DatabaseAdministrator: 50,
        TechnicalWriter: 45,
        ProductManager: 70,
        QAAutomationEngineer: 80,
        ERPConsultant: 45,
        NetworkEngineer: 55,
        AugmentedRealityDeveloper: 80,
        SalesforceDeveloper: 60,
        ScrumMaster: 65,
      },
      {
        skill: "Machine Learning",
        DataScientist: 100,
        CloudEngineer: 60,
        WebDeveloper: 45,
        AISpecialist: 100,
        CybersecurityAnalyst: 55,
        DevOpsEngineer: 65,
        MobileDeveloper: 45,
        UXUIDesigner: 35,
        BlockchainDeveloper: 50,
        EmbeddedSystemsEngineer: 50,
        GameDeveloper: 40,
        DatabaseAdministrator: 60,
        TechnicalWriter: 30,
        ProductManager: 75,
        QAAutomationEngineer: 60,
        ERPConsultant: 40,
        NetworkEngineer: 45,
        AugmentedRealityDeveloper: 70,
        SalesforceDeveloper: 35,
        ScrumMaster: 40,
      },
      {
        skill: "Network Security",
        DataScientist: 50,
        CloudEngineer: 80,
        WebDeveloper: 40,
        AISpecialist: 45,
        CybersecurityAnalyst: 100,
        DevOpsEngineer: 92,
        MobileDeveloper: 55,
        UXUIDesigner: 35,
        BlockchainDeveloper: 80,
        EmbeddedSystemsEngineer: 60,
        GameDeveloper: 40,
        DatabaseAdministrator: 70,
        TechnicalWriter: 30,
        ProductManager: 55,
        QAAutomationEngineer: 75,
        ERPConsultant: 50,
        NetworkEngineer: 100,
        AugmentedRealityDeveloper: 50,
        SalesforceDeveloper: 45,
        ScrumMaster: 50,
      },
      {
        skill: "Containers (Docker/K8s)",
        DataScientist: 70,
        CloudEngineer: 96,
        WebDeveloper: 75,
        AISpecialist: 65,
        CybersecurityAnalyst: 86,
        DevOpsEngineer: 100,
        MobileDeveloper: 65,
        UXUIDesigner: 50,
        BlockchainDeveloper: 80,
        EmbeddedSystemsEngineer: 40,
        GameDeveloper: 55,
        DatabaseAdministrator: 85,
        TechnicalWriter: 30,
        ProductManager: 80,
        QAAutomationEngineer: 86,
        ERPConsultant: 60,
        NetworkEngineer: 92,
        AugmentedRealityDeveloper: 55,
        SalesforceDeveloper: 40,
        ScrumMaster: 70,
      },
      {
        skill: "SQL",
        DataScientist: 96,
        CloudEngineer: 70,
        WebDeveloper: 60,
        AISpecialist: 75,
        CybersecurityAnalyst: 85,
        DevOpsEngineer: 80,
        MobileDeveloper: 60,
        UXUIDesigner: 40,
        BlockchainDeveloper: 70,
        EmbeddedSystemsEngineer: 70,
        GameDeveloper: 50,
        DatabaseAdministrator: 100,
        TechnicalWriter: 50,
        ProductManager: 75,
        QAAutomationEngineer: 95,
        ERPConsultant: 90,
        NetworkEngineer: 65,
        AugmentedRealityDeveloper: 40,
        SalesforceDeveloper: 80,
        ScrumMaster: 55,
      },
      {
        skill: "Agile/Scrum",
        DataScientist: 75,
        CloudEngineer: 80,
        WebDeveloper: 86,
        AISpecialist: 70,
        CybersecurityAnalyst: 75,
        DevOpsEngineer: 100,
        MobileDeveloper: 92,
        UXUIDesigner: 96,
        BlockchainDeveloper: 80,
        EmbeddedSystemsEngineer: 60,
        GameDeveloper: 86,
        DatabaseAdministrator: 70,
        TechnicalWriter: 80,
        ProductManager: 100,
        QAAutomationEngineer: 96,
        ERPConsultant: 100,
        NetworkEngineer: 80,
        AugmentedRealityDeveloper: 85,
        SalesforceDeveloper: 92,
        ScrumMaster: 100,
      },
    ],
  },
  jobComparison: {
    "1month": [
      {
        jobTitle: "Data Scientist I",
        salary: 90000,
        benefitsScore: 85,
        locationCostIndex: 70,
        rating: 4.2,
      },
      {
        jobTitle: "Cloud Engineer I",
        salary: 88000,
        benefitsScore: 80,
        locationCostIndex: 65,
        rating: 4.0,
      },
      {
        jobTitle: "Web Developer I",
        salary: 70000,
        benefitsScore: 75,
        locationCostIndex: 60,
        rating: 3.8,
      },
      {
        jobTitle: "AI Specialist I",
        salary: 115000,
        benefitsScore: 88,
        locationCostIndex: 78,
        rating: 4.6,
      },
      {
        jobTitle: "Cybersecurity Analyst I",
        salary: 98000,
        benefitsScore: 82,
        locationCostIndex: 68,
        rating: 4.3,
      },
      {
        jobTitle: "DevOps Engineer I",
        salary: 105000,
        benefitsScore: 88,
        locationCostIndex: 75,
        rating: 4.5,
      },
      {
        jobTitle: "Mobile Developer I",
        salary: 88000,
        benefitsScore: 78,
        locationCostIndex: 68,
        rating: 4.0,
      },
      {
        jobTitle: "UX/UI Designer I",
        salary: 80000,
        benefitsScore: 80,
        locationCostIndex: 65,
        rating: 4.1,
      },
      {
        jobTitle: "Blockchain Developer I",
        salary: 125000,
        benefitsScore: 90,
        locationCostIndex: 82,
        rating: 4.7,
      },
      {
        jobTitle: "Embedded Systems Eng I",
        salary: 92000,
        benefitsScore: 81,
        locationCostIndex: 69,
        rating: 3.9,
      },
      {
        jobTitle: "Game Developer I",
        salary: 75000,
        benefitsScore: 70,
        locationCostIndex: 64,
        rating: 3.7,
      },
      {
        jobTitle: "DBA I",
        salary: 85000,
        benefitsScore: 76,
        locationCostIndex: 62,
        rating: 3.8,
      },
      {
        jobTitle: "Technical Writer I",
        salary: 65000,
        benefitsScore: 72,
        locationCostIndex: 58,
        rating: 3.6,
      },
      {
        jobTitle: "Product Manager I",
        salary: 130000,
        benefitsScore: 95,
        locationCostIndex: 88,
        rating: 4.8,
      },
      {
        jobTitle: "QA Automation Eng I",
        salary: 82000,
        benefitsScore: 79,
        locationCostIndex: 66,
        rating: 4.0,
      },
      {
        jobTitle: "ERP Consultant I",
        salary: 100000,
        benefitsScore: 84,
        locationCostIndex: 72,
        rating: 4.1,
      },
      {
        jobTitle: "Network Engineer I",
        salary: 87000,
        benefitsScore: 78,
        locationCostIndex: 67,
        rating: 3.9,
      },
      {
        jobTitle: "Augmented Reality Dev I",
        salary: 98000,
        benefitsScore: 86,
        locationCostIndex: 74,
        rating: 4.4,
      },
      {
        jobTitle: "Salesforce Developer I",
        salary: 94000,
        benefitsScore: 80,
        locationCostIndex: 70,
        rating: 4.2,
      },
      {
        jobTitle: "Scrum Master I",
        salary: 102000,
        benefitsScore: 87,
        locationCostIndex: 73,
        rating: 4.3,
      },
    ],
    "3months": [
      {
        jobTitle: "Data Scientist I",
        salary: 91800,
        benefitsScore: 85.2,
        locationCostIndex: 70,
        rating: 4.3,
      },
      {
        jobTitle: "Cloud Engineer I",
        salary: 89760,
        benefitsScore: 80.2,
        locationCostIndex: 65,
        rating: 4.1,
      },
      {
        jobTitle: "Web Developer I",
        salary: 71400,
        benefitsScore: 75.1,
        locationCostIndex: 60,
        rating: 3.9,
      },
      {
        jobTitle: "AI Specialist I",
        salary: 117300,
        benefitsScore: 88.2,
        locationCostIndex: 78,
        rating: 4.7,
      },
      {
        jobTitle: "Cybersecurity Analyst I",
        salary: 99960,
        benefitsScore: 82.1,
        locationCostIndex: 68,
        rating: 4.4,
      },
      {
        jobTitle: "DevOps Engineer I",
        salary: 107100,
        benefitsScore: 88.2,
        locationCostIndex: 75,
        rating: 4.6,
      },
      {
        jobTitle: "Mobile Developer I",
        salary: 89760,
        benefitsScore: 78.1,
        locationCostIndex: 68,
        rating: 4.1,
      },
      {
        jobTitle: "UX/UI Designer I",
        salary: 81600,
        benefitsScore: 80.1,
        locationCostIndex: 65,
        rating: 4.2,
      },
      {
        jobTitle: "Blockchain Developer I",
        salary: 127500,
        benefitsScore: 90.2,
        locationCostIndex: 82,
        rating: 4.8,
      },
      {
        jobTitle: "Embedded Systems Eng I",
        salary: 93840,
        benefitsScore: 81.1,
        locationCostIndex: 69,
        rating: 4.0,
      },
      {
        jobTitle: "Game Developer I",
        salary: 76500,
        benefitsScore: 70.1,
        locationCostIndex: 64,
        rating: 3.8,
      },
      {
        jobTitle: "DBA I",
        salary: 86700,
        benefitsScore: 76.1,
        locationCostIndex: 62,
        rating: 3.9,
      },
      {
        jobTitle: "Technical Writer I",
        salary: 66300,
        benefitsScore: 72.1,
        locationCostIndex: 58,
        rating: 3.7,
      },
      {
        jobTitle: "Product Manager I",
        salary: 132600,
        benefitsScore: 95.2,
        locationCostIndex: 88,
        rating: 4.9,
      },
      {
        jobTitle: "QA Automation Eng I",
        salary: 83640,
        benefitsScore: 79.1,
        locationCostIndex: 66,
        rating: 4.1,
      },
      {
        jobTitle: "ERP Consultant I",
        salary: 102000,
        benefitsScore: 84.1,
        locationCostIndex: 72,
        rating: 4.2,
      },
      {
        jobTitle: "Network Engineer I",
        salary: 88740,
        benefitsScore: 78.1,
        locationCostIndex: 67,
        rating: 4.0,
      },
      {
        jobTitle: "Augmented Reality Dev I",
        salary: 99960,
        benefitsScore: 86.2,
        locationCostIndex: 74,
        rating: 4.5,
      },
      {
        jobTitle: "Salesforce Developer I",
        salary: 95880,
        benefitsScore: 80.1,
        locationCostIndex: 70,
        rating: 4.3,
      },
      {
        jobTitle: "Scrum Master I",
        salary: 104040,
        benefitsScore: 87.1,
        locationCostIndex: 73,
        rating: 4.4,
      },
    ],
    "6months": [
      {
        jobTitle: "Data Scientist I",
        salary: 93600,
        benefitsScore: 85.4,
        locationCostIndex: 70,
        rating: 4.4,
      },
      {
        jobTitle: "Cloud Engineer I",
        salary: 91520,
        benefitsScore: 80.3,
        locationCostIndex: 65,
        rating: 4.2,
      },
      {
        jobTitle: "Web Developer I",
        salary: 72800,
        benefitsScore: 75.3,
        locationCostIndex: 60,
        rating: 4.0,
      },
      {
        jobTitle: "AI Specialist I",
        salary: 119600,
        benefitsScore: 88.4,
        locationCostIndex: 78,
        rating: 4.8,
      },
      {
        jobTitle: "Cybersecurity Analyst I",
        salary: 101920,
        benefitsScore: 82.3,
        locationCostIndex: 68,
        rating: 4.5,
      },
      {
        jobTitle: "DevOps Engineer I",
        salary: 109200,
        benefitsScore: 88.4,
        locationCostIndex: 75,
        rating: 4.7,
      },
      {
        jobTitle: "Mobile Developer I",
        salary: 91520,
        benefitsScore: 78.3,
        locationCostIndex: 68,
        rating: 4.2,
      },
      {
        jobTitle: "UX/UI Designer I",
        salary: 83200,
        benefitsScore: 80.3,
        locationCostIndex: 65,
        rating: 4.3,
      },
      {
        jobTitle: "Blockchain Developer I",
        salary: 130000,
        benefitsScore: 90.4,
        locationCostIndex: 82,
        rating: 4.9,
      },
      {
        jobTitle: "Embedded Systems Eng I",
        salary: 95680,
        benefitsScore: 81.3,
        locationCostIndex: 69,
        rating: 4.1,
      },
      {
        jobTitle: "Game Developer I",
        salary: 78000,
        benefitsScore: 70.3,
        locationCostIndex: 64,
        rating: 3.9,
      },
      {
        jobTitle: "DBA I",
        salary: 88400,
        benefitsScore: 76.3,
        locationCostIndex: 62,
        rating: 4.0,
      },
      {
        jobTitle: "Technical Writer I",
        salary: 67600,
        benefitsScore: 72.3,
        locationCostIndex: 58,
        rating: 3.8,
      },
      {
        jobTitle: "Product Manager I",
        salary: 135200,
        benefitsScore: 95.4,
        locationCostIndex: 88,
        rating: 5.0,
      },
      {
        jobTitle: "QA Automation Eng I",
        salary: 85280,
        benefitsScore: 79.3,
        locationCostIndex: 66,
        rating: 4.2,
      },
      {
        jobTitle: "ERP Consultant I",
        salary: 104000,
        benefitsScore: 84.3,
        locationCostIndex: 72,
        rating: 4.3,
      },
      {
        jobTitle: "Network Engineer I",
        salary: 90480,
        benefitsScore: 78.3,
        locationCostIndex: 67,
        rating: 4.1,
      },
      {
        jobTitle: "Augmented Reality Dev I",
        salary: 101920,
        benefitsScore: 86.4,
        locationCostIndex: 74,
        rating: 4.6,
      },
      {
        jobTitle: "Salesforce Developer I",
        salary: 97760,
        benefitsScore: 80.3,
        locationCostIndex: 70,
        rating: 4.4,
      },
      {
        jobTitle: "Scrum Master I",
        salary: 106080,
        benefitsScore: 87.3,
        locationCostIndex: 73,
        rating: 4.5,
      },
    ],
    "1year": [
      {
        jobTitle: "Data Scientist I",
        salary: 95400,
        benefitsScore: 85.5,
        locationCostIndex: 70,
        rating: 4.5,
      },
      {
        jobTitle: "Cloud Engineer I",
        salary: 93280,
        benefitsScore: 80.5,
        locationCostIndex: 65,
        rating: 4.3,
      },
      {
        jobTitle: "Web Developer I",
        salary: 74200,
        benefitsScore: 75.5,
        locationCostIndex: 60,
        rating: 4.1,
      },
      {
        jobTitle: "AI Specialist I",
        salary: 121900,
        benefitsScore: 88.5,
        locationCostIndex: 78,
        rating: 4.9,
      },
      {
        jobTitle: "Cybersecurity Analyst I",
        salary: 103880,
        benefitsScore: 82.5,
        locationCostIndex: 68,
        rating: 4.6,
      },
      {
        jobTitle: "DevOps Engineer I",
        salary: 111300,
        benefitsScore: 88.5,
        locationCostIndex: 75,
        rating: 4.8,
      },
      {
        jobTitle: "Mobile Developer I",
        salary: 93280,
        benefitsScore: 78.5,
        locationCostIndex: 68,
        rating: 4.3,
      },
      {
        jobTitle: "UX/UI Designer I",
        salary: 84800,
        benefitsScore: 80.5,
        locationCostIndex: 65,
        rating: 4.4,
      },
      {
        jobTitle: "Blockchain Developer I",
        salary: 132500,
        benefitsScore: 90.5,
        locationCostIndex: 82,
        rating: 5.0,
      },
      {
        jobTitle: "Embedded Systems Eng I",
        salary: 97520,
        benefitsScore: 81.5,
        locationCostIndex: 69,
        rating: 4.2,
      },
      {
        jobTitle: "Game Developer I",
        salary: 79500,
        benefitsScore: 70.5,
        locationCostIndex: 64,
        rating: 4.0,
      },
      {
        jobTitle: "DBA I",
        salary: 90100,
        benefitsScore: 76.5,
        locationCostIndex: 62,
        rating: 4.1,
      },
      {
        jobTitle: "Technical Writer I",
        salary: 68900,
        benefitsScore: 72.5,
        locationCostIndex: 58,
        rating: 3.9,
      },
      {
        jobTitle: "Product Manager I",
        salary: 137800,
        benefitsScore: 95.5,
        locationCostIndex: 88,
        rating: 5.1,
      },
      {
        jobTitle: "QA Automation Eng I",
        salary: 86920,
        benefitsScore: 79.5,
        locationCostIndex: 66,
        rating: 4.3,
      },
      {
        jobTitle: "ERP Consultant I",
        salary: 106000,
        benefitsScore: 84.5,
        locationCostIndex: 72,
        rating: 4.4,
      },
      {
        jobTitle: "Network Engineer I",
        salary: 92220,
        benefitsScore: 78.5,
        locationCostIndex: 67,
        rating: 4.2,
      },
      {
        jobTitle: "Augmented Reality Dev I",
        salary: 103880,
        benefitsScore: 86.5,
        locationCostIndex: 74,
        rating: 4.7,
      },
      {
        jobTitle: "Salesforce Developer I",
        salary: 99640,
        benefitsScore: 80.5,
        locationCostIndex: 70,
        rating: 4.5,
      },
      {
        jobTitle: "Scrum Master I",
        salary: 108120,
        benefitsScore: 87.5,
        locationCostIndex: 73,
        rating: 4.6,
      },
    ],
  },
};

export default function InsightsPage() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("1month");
  const [activeTab, setActiveTab] = useState("careers");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [animatedValues, setAnimatedValues] = useState({
    resumeScore: 0,
    skillMatch: 0,
    applicationSuccess: 0,
    marketAlignment: 0,
  });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setAnimatedValues({
        resumeScore: 85,
        skillMatch: 78,
        applicationSuccess: 26.7,
        marketAlignment: 82,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Extract current period data
  const currentCareers =
    expandedDummyData.careerOptions[selectedTimeframe] || [];
  const currentSkills =
    expandedDummyData.skillsComparison[selectedTimeframe] || [];
  const currentJobs = expandedDummyData.jobComparison[selectedTimeframe] || [];

  // Top 10 careers for charts
  const topCareers = [...currentCareers]
    .sort((a, b) => b.demandIndex - a.demandIndex)
    .slice(0, 10);

  // Prepare radar data for top 5 skills
  const topSkillNames = [
    "DataScientist",
    "CloudEngineer",
    "DevOpsEngineer",
    "AISpecialist",
    "WebDeveloper",
  ];
  const radarData = currentSkills.slice(0, 6).map((skill) => ({
    skill: skill.skill,
    ...topSkillNames.reduce((acc, name) => {
      acc[name] = skill[name] || 0;
      return acc;
    }, {}),
  }));

  // Job ratings for pie chart
  const ratingCategories = {
    "Excellent (4.5+)": 0,
    "Very Good (4.0-4.5)": 0,
    "Good (3.5-4.0)": 0,
    "Average (<3.5)": 0,
  };
  currentJobs.forEach((job) => {
    if (job.rating >= 4.5) ratingCategories["Excellent (4.5+)"]++;
    else if (job.rating >= 4.0) ratingCategories["Very Good (4.0-4.5)"]++;
    else if (job.rating >= 3.5) ratingCategories["Good (3.5-4.0)"]++;
    else ratingCategories["Average (<3.5)"]++;
  });
  const pieData = Object.keys(ratingCategories)
    .map((k, idx) => ({
      name: k,
      value: ratingCategories[k],
      fill: ["#28A745", "#17A2B8", "#FFC107", "#DC3545"][idx],
    }))
    .filter((d) => d.value > 0);

  // Scatter data for salary vs benefits
  const scatterData = currentJobs.slice(0, 12).map((job) => ({
    salary: job.salary,
    benefits: job.benefitsScore,
    rating: job.rating,
    name: job.jobTitle,
  }));

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 sm:p-4 border border-gray-200 rounded-lg shadow-lg max-w-xs">
          <p className="font-semibold text-gray-900 text-sm">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p
              key={index}
              style={{ color: entry.color }}
              className="text-xs sm:text-sm"
            >
              {entry.name}: {entry.value}
              {entry.name.includes("Salary") && "$"}
              {entry.name.includes("Growth") && "%"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Download handler
  const handleDownload = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent +=
      "\n=== CAREER OPTIONS ===\nCareer,Demand Index,Avg Salary,Growth %,Openings\n";
    currentCareers.forEach((item) => {
      csvContent += `${item.career},${item.demandIndex},${item.avgSalary},${item.growthPercent},${item.openings}\n`;
    });
    csvContent +=
      "\n=== JOB COMPARISON ===\nJob Title,Salary,Benefits Score,Location Cost Index,Rating\n";
    currentJobs.forEach((job) => {
      csvContent += `${job.jobTitle},${job.salary},${job.benefitsScore},${job.locationCostIndex},${job.rating}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `career_insights_${selectedTimeframe}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const COLORS = ["#667eea", "#ff6b6b", "#51cf66", "#ffd43b", "#20b2aa"];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30">
      {/* Mobile-First Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
        <div className="px-3 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
              </div>
              <div>
                <h1 className="text-base sm:text-xl lg:text-2xl font-bold text-gray-900">
                  Career Analytics
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 hidden sm:block">
                  Market insights & trend analysis
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="hidden md:flex items-center gap-2">
                <Select
                  value={selectedTimeframe}
                  onValueChange={setSelectedTimeframe}
                >
                  <SelectTrigger className="w-32 h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1month">1 Month</SelectItem>
                    <SelectItem value="3months">3 Months</SelectItem>
                    <SelectItem value="6months">6 Months</SelectItem>
                    <SelectItem value="1year">1 Year</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  size="sm"
                  onClick={handleDownload}
                  className="bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] hover:from-[#5B54E6] hover:to-[#4F46E5] text-white shadow-lg"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowMobileMenu(!showMobileMenu)}
                className="md:hidden p-2"
              >
                {showMobileMenu ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>

          {showMobileMenu && (
            <div className="md:hidden mt-3 p-3 bg-gray-50 rounded-lg space-y-3">
              <Select
                value={selectedTimeframe}
                onValueChange={setSelectedTimeframe}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">1 Month</SelectItem>
                  <SelectItem value="3months">3 Months</SelectItem>
                  <SelectItem value="6months">6 Months</SelectItem>
                  <SelectItem value="1year">1 Year</SelectItem>
                </SelectContent>
              </Select>
              <Button
                onClick={handleDownload}
                className="w-full bg-gradient-to-r from-[#6C63FF] to-[#5B54E6] text-white"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-4 sm:space-y-6">
        <div className="max-w-7xl mx-auto space-y-4 sm:space-y-6">
          {/* Key Metrics Cards */}
          <div
            className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 ${
              isVisible ? "animate-fadeInUp" : "opacity-0"
            }`}
          >
            {[
              {
                title: "Total Careers",
                value: currentCareers.length,
                change: `${selectedTimeframe}`,
                icon: Target,
                color: "text-[#6C63FF]",
                bgColor: "bg-purple-50",
                borderColor: "border-purple-200",
                trend: "up",
              },
              {
                title: "Avg Demand",
                value: Math.round(
                  currentCareers.reduce((sum, c) => sum + c.demandIndex, 0) /
                    currentCareers.length
                ),
                change: "Index",
                icon: TrendingUp,
                color: "text-blue-600",
                bgColor: "bg-blue-50",
                borderColor: "border-blue-200",
                trend: "up",
              },
              {
                title: "Top Salary",
                value: `$${
                  Math.max(...currentCareers.map((c) => c.avgSalary)) / 1000
                }k`,
                change: "Max earnings",
                icon: Trophy,
                color: "text-green-600",
                bgColor: "bg-green-50",
                borderColor: "border-green-200",
                trend: "up",
              },
              {
                title: "Job Openings",
                value: `${(
                  currentCareers.reduce((sum, c) => sum + c.openings, 0) / 1000
                ).toFixed(1)}k`,
                change: "Total",
                icon: Rocket,
                color: "text-orange-600",
                bgColor: "bg-orange-50",
                borderColor: "border-orange-200",
                trend: "up",
              },
            ].map((metric, index) => (
              <Card
                key={index}
                className={`border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${metric.bgColor} border ${metric.borderColor}`}
              >
                <CardContent className="p-3 sm:p-4 lg:p-6">
                  <div className="flex items-center justify-between mb-2 sm:mb-3">
                    <div
                      className={`p-1.5 sm:p-2 rounded-lg bg-white/70 shadow-sm`}
                    >
                      <metric.icon
                        className={`h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 ${metric.color}`}
                      />
                    </div>
                    {metric.trend === "up" ? (
                      <ArrowUpRight className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    ) : (
                      <ArrowDownRight className="h-3 w-3 sm:h-4 sm:w-4 text-red-600" />
                    )}
                  </div>

                  <div
                    className={`text-lg sm:text-xl lg:text-2xl font-bold ${metric.color} mb-1 sm:mb-2`}
                  >
                    {metric.value}
                  </div>

                  <p className="text-xs sm:text-sm font-medium text-gray-900 mb-1 sm:mb-2">
                    {metric.title}
                  </p>

                  <p className="text-xs text-gray-600">{metric.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Tabs Section */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className={`space-y-4 ${
              isVisible ? "animate-slideInLeft" : "opacity-0"
            }`}
          >
            {/* Mobile Tab Selector */}
            <div className="md:hidden">
              <Select value={activeTab} onValueChange={setActiveTab}>
                <SelectTrigger className="w-full h-12 shadow-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="careers">🚀 Career Options</SelectItem>
                  <SelectItem value="skills">💡 Skills Matrix</SelectItem>
                  <SelectItem value="jobs">💼 Job Analysis</SelectItem>
                  <SelectItem value="trends">📈 Market Trends</SelectItem>
                  <SelectItem value="radar">⚡ Skill Radar</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Desktop Tab List */}
            <div className="hidden md:block overflow-x-auto">
              <TabsList className="grid w-full grid-cols-5 h-12 bg-gray-100 rounded-xl p-1">
                <TabsTrigger
                  value="careers"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs lg:text-sm"
                >
                  <Rocket className="h-4 w-4 mr-1 lg:mr-2" />
                  Careers
                </TabsTrigger>
                <TabsTrigger
                  value="skills"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs lg:text-sm"
                >
                  <Brain className="h-4 w-4 mr-1 lg:mr-2" />
                  Skills
                </TabsTrigger>
                <TabsTrigger
                  value="jobs"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs lg:text-sm"
                >
                  <Target className="h-4 w-4 mr-1 lg:mr-2" />
                  Jobs
                </TabsTrigger>
                <TabsTrigger
                  value="trends"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs lg:text-sm"
                >
                  <TrendingUp className="h-4 w-4 mr-1 lg:mr-2" />
                  Trends
                </TabsTrigger>
                <TabsTrigger
                  value="radar"
                  className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs lg:text-sm"
                >
                  <Zap className="h-4 w-4 mr-1 lg:mr-2" />
                  Radar
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Career Options Tab */}
            <TabsContent value="careers" className="space-y-4">
              <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm hover:shadow-2xl transition-shadow duration-300">
                <CardHeader className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-base sm:text-lg lg:text-xl font-bold text-gray-900">
                        Career Demand & Salary Analysis
                      </CardTitle>
                      <CardDescription className="text-xs sm:text-sm text-gray-600 mt-1">
                        Top 10 careers by demand index
                      </CardDescription>
                    </div>
                    <Badge className="bg-purple-100 text-purple-800 text-xs">
                      {selectedTimeframe}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="h-80 sm:h-96 lg:h-[450px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <ComposedChart
                        data={topCareers}
                        margin={{ top: 20, right: 20, left: 0, bottom: 80 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="career"
                          angle={-35}
                          textAnchor="end"
                          height={100}
                          fontSize={11}
                          interval={0}
                        />
                        <YAxis
                          yAxisId="demand"
                          label={{
                            value: "Demand Index",
                            angle: -90,
                            position: "insideLeft",
                          }}
                          domain={[0, 100]}
                          fontSize={12}
                        />
                        <YAxis
                          yAxisId="salary"
                          orientation="right"
                          label={{
                            value: "Salary (USD)",
                            angle: 90,
                            position: "insideRight",
                          }}
                          domain={[0, 150000]}
                          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                          fontSize={12}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={50} />
                        <Bar
                          yAxisId="demand"
                          dataKey="demandIndex"
                          fill="#667eea"
                          name="Demand Index"
                          radius={[8, 8, 0, 0]}
                        />
                        <Bar
                          yAxisId="salary"
                          dataKey="avgSalary"
                          fill="#ff6b6b"
                          name="Avg Salary"
                          radius={[8, 8, 0, 0]}
                        />
                        <Line
                          yAxisId="demand"
                          type="monotone"
                          dataKey="growthPercent"
                          stroke="#51cf66"
                          strokeWidth={3}
                          name="Growth %"
                        />
                      </ComposedChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Career Growth & Openings */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="border-0 shadow-xl bg-white/95">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg font-bold">
                      Growth Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={topCareers}
                          margin={{ top: 10, right: 10, left: 0, bottom: 60 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="career"
                            angle={-30}
                            textAnchor="end"
                            height={80}
                            fontSize={11}
                            interval={0}
                          />
                          <YAxis fontSize={12} />
                          <Tooltip />
                          <Bar
                            dataKey="growthPercent"
                            fill="#51cf66"
                            name="Growth %"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/95">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg font-bold">
                      Job Openings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={topCareers}
                          layout="horizontal"
                          margin={{ top: 10, right: 10, left: 0, bottom: 60 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            dataKey="career"
                            angle={-30}
                            textAnchor="end"
                            height={80}
                            fontSize={11}
                            interval={0}
                          />
                          <YAxis
                            tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
                            fontSize={12}
                          />
                          <Tooltip />
                          <Bar
                            dataKey="openings"
                            fill="#ffd43b"
                            name="Job Openings"
                            radius={[4, 4, 0, 0]}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Skills Matrix Tab */}
            <TabsContent value="skills" className="space-y-4">
              <Card className="border-0 shadow-xl bg-white/95">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg lg:text-xl font-bold">
                    Skills Proficiency Matrix
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Skill requirements across top careers
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="h-80 sm:h-96 lg:h-[450px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={currentSkills}
                        margin={{ top: 20, right: 20, left: 0, bottom: 60 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="skill"
                          angle={-25}
                          textAnchor="end"
                          height={80}
                          fontSize={12}
                          interval={0}
                        />
                        <YAxis domain={[0, 100]} fontSize={12} />
                        <Tooltip />
                        <Legend />
                        {topSkillNames.map((key, idx) => (
                          <Area
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stackId={`st${idx}`}
                            stroke={COLORS[idx]}
                            fill={COLORS[idx]}
                            fillOpacity={0.6}
                            name={key.replace(/([A-Z])/g, " $1").trim()}
                          />
                        ))}
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Jobs Analysis Tab */}
            <TabsContent value="jobs" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <Card className="border-0 shadow-xl bg-white/95">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg font-bold">
                      Salary vs Benefits
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                          margin={{ top: 20, right: 20, left: 0, bottom: 20 }}
                        >
                          <CartesianGrid
                            strokeDasharray="3 3"
                            stroke="#f0f0f0"
                          />
                          <XAxis
                            type="number"
                            dataKey="salary"
                            name="Salary"
                            label={{
                              value: "Salary",
                              position: "insideBottom",
                              offset: -5,
                            }}
                            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                            fontSize={12}
                          />
                          <YAxis
                            type="number"
                            dataKey="benefits"
                            name="Benefits"
                            label={{
                              value: "Benefits Score",
                              angle: -90,
                              position: "insideLeft",
                            }}
                            fontSize={12}
                          />
                          <ZAxis
                            dataKey="rating"
                            range={[50, 350]}
                            name="Rating"
                          />
                          <Tooltip
                            content={({ active, payload }) => {
                              if (active && payload && payload.length) {
                                const data = payload[0].payload;
                                return (
                                  <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                                    <p className="font-semibold text-sm">
                                      {data.name}
                                    </p>
                                    <p className="text-xs">
                                      Salary: ${(data.salary / 1000).toFixed(1)}
                                      k
                                    </p>
                                    <p className="text-xs">
                                      Benefits: {data.benefits}
                                    </p>
                                    <p className="text-xs">
                                      Rating: {data.rating} ⭐
                                    </p>
                                  </div>
                                );
                              }
                              return null;
                            }}
                          />
                          <Scatter
                            name="Jobs"
                            data={scatterData}
                            fill="#667eea"
                          >
                            {scatterData.map((entry, index) => (
                              <Cell
                                key={`cell-${index}`}
                                fill={COLORS[index % COLORS.length]}
                              />
                            ))}
                          </Scatter>
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-xl bg-white/95">
                  <CardHeader className="p-4 sm:p-6">
                    <CardTitle className="text-base sm:text-lg font-bold">
                      Job Ratings Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-4 sm:p-6 pt-0">
                    <div className="h-64 sm:h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={pieData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            outerRadius={100}
                            label
                          >
                            {pieData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.fill} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend
                            verticalAlign="bottom"
                            height={36}
                            iconType="circle"
                          />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Market Trends Tab */}
            <TabsContent value="trends" className="space-y-4">
              <Card className="border-0 shadow-xl bg-white/95">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg lg:text-xl font-bold">
                    Salary Trends Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="h-80 sm:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart
                        data={topCareers}
                        margin={{ top: 20, right: 20, left: 0, bottom: 80 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                        <XAxis
                          dataKey="career"
                          angle={-35}
                          textAnchor="end"
                          height={100}
                          fontSize={11}
                          interval={0}
                        />
                        <YAxis
                          tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                          fontSize={12}
                        />
                        <Tooltip />
                        <Legend />
                        <Line
                          type="monotone"
                          dataKey="avgSalary"
                          stroke="#667eea"
                          strokeWidth={3}
                          name="Average Salary"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Radar Tab */}
            <TabsContent value="radar" className="space-y-4">
              <Card className="border-0 shadow-xl bg-white/95">
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="text-base sm:text-lg font-bold">
                    Skills Comparison Radar
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    Multi-dimensional skill analysis
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-4 sm:p-6 pt-0">
                  <div className="h-80 sm:h-96">
                    <ResponsiveContainer width="100%" height="100%">
                      <RadarChart data={radarData}>
                        <PolarGrid stroke="#e0e0e0" />
                        <PolarAngleAxis dataKey="skill" fontSize={12} />
                        <PolarRadiusAxis
                          angle={90}
                          domain={[0, 100]}
                          fontSize={11}
                        />
                        {topSkillNames.map((career, idx) => (
                          <Radar
                            key={career}
                            name={career.replace(/([A-Z])/g, " $1").trim()}
                            dataKey={career}
                            stroke={COLORS[idx]}
                            fill={COLORS[idx]}
                            fillOpacity={0.5}
                            strokeWidth={2}
                          />
                        ))}
                        <Legend
                          wrapperStyle={{ fontSize: "12px" }}
                          iconType="circle"
                        />
                        <Tooltip />
                      </RadarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <div className="h-8 sm:h-0" />
    </div>
  );
}
