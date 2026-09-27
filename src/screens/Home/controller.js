import { useMemo } from "react";

import useAssemblyProject from "hooks/useAssemblyProject";

const parseCompositionText = (value = "") =>
  String(value)
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const serializeComposition = (value = []) => value.join("\n");

export const buildEventItems = (prefix) => [
  { ref: `${prefix}.date`, label: "Data do evento", placeholder: "", quarter: true },
  { ref: `${prefix}.theme`, label: "Tema do evento", placeholder: "", full: true },
  { ref: `${prefix}.venue`, label: "Local do evento", placeholder: "", full: true },
  { ref: `${prefix}.venueAddress`, label: "Endereço do evento", placeholder: "", full: true, space: true },
  { ref: `${prefix}.rehearsalVenue`, label: "Local do ensaio", placeholder: "", full: true },
  { ref: `${prefix}.rehearsalAddress`, label: "Endereço do ensaio", placeholder: "", full: true },
  { ref: `${prefix}.rehearsalDateTime`, label: "Dia e hora do ensaio", placeholder: "", quarter: true },
];

export default function useController() {
  const { project, setProject, resetSection } = useAssemblyProject();
  const circuitMode = project.settings?.circuitMode === "parts" ? "parts" : "single";

  const travelerRegister = useMemo(
    () => project.traveler,
    [project.traveler]
  );

  const coRegister = useMemo(
    () => ({
      "partA.date": project.events.co.partA.date,
      "partA.theme": project.events.co.partA.theme,
      "partA.venue": project.events.co.partA.venue,
      "partA.venueAddress": project.events.co.partA.venueAddress,
      "partA.rehearsalVenue": project.events.co.partA.rehearsalVenue,
      "partA.rehearsalAddress": project.events.co.partA.rehearsalAddress,
      "partA.rehearsalDateTime": project.events.co.partA.rehearsalDateTime,
      "partB.date": project.events.co.partB.date,
      "partB.theme": project.events.co.partB.theme,
      "partB.venue": project.events.co.partB.venue,
      "partB.venueAddress": project.events.co.partB.venueAddress,
      "partB.rehearsalVenue": project.events.co.partB.rehearsalVenue,
      "partB.rehearsalAddress": project.events.co.partB.rehearsalAddress,
      "partB.rehearsalDateTime": project.events.co.partB.rehearsalDateTime,
    }),
    [project.events.co]
  );

  const brRegister = useMemo(
    () => ({
      "partA.date": project.events.br.partA.date,
      "partA.theme": project.events.br.partA.theme,
      "partA.venue": project.events.br.partA.venue,
      "partA.venueAddress": project.events.br.partA.venueAddress,
      "partA.rehearsalVenue": project.events.br.partA.rehearsalVenue,
      "partA.rehearsalAddress": project.events.br.partA.rehearsalAddress,
      "partA.rehearsalDateTime": project.events.br.partA.rehearsalDateTime,
      "partB.date": project.events.br.partB.date,
      "partB.theme": project.events.br.partB.theme,
      "partB.venue": project.events.br.partB.venue,
      "partB.venueAddress": project.events.br.partB.venueAddress,
      "partB.rehearsalVenue": project.events.br.partB.rehearsalVenue,
      "partB.rehearsalAddress": project.events.br.partB.rehearsalAddress,
      "partB.rehearsalDateTime": project.events.br.partB.rehearsalDateTime,
    }),
    [project.events.br]
  );

  const pioRegister = useMemo(
    () => ({
      "partA.date": project.events.pioneers.partA.date,
      "partA.theme": project.events.pioneers.partA.theme,
      "partA.venue": project.events.pioneers.partA.venue,
      "partA.venueAddress": project.events.pioneers.partA.venueAddress,
      "partA.rehearsalVenue": project.events.pioneers.partA.rehearsalVenue,
      "partA.rehearsalAddress": project.events.pioneers.partA.rehearsalAddress,
      "partA.rehearsalDateTime": project.events.pioneers.partA.rehearsalDateTime,
      "partB.date": project.events.pioneers.partB.date,
      "partB.theme": project.events.pioneers.partB.theme,
      "partB.venue": project.events.pioneers.partB.venue,
      "partB.venueAddress": project.events.pioneers.partB.venueAddress,
      "partB.rehearsalVenue": project.events.pioneers.partB.rehearsalVenue,
      "partB.rehearsalAddress": project.events.pioneers.partB.rehearsalAddress,
      "partB.rehearsalDateTime": project.events.pioneers.partB.rehearsalDateTime,
    }),
    [project.events.pioneers]
  );

  const compositionRegister = useMemo(
    () => ({
      partA: serializeComposition(project.circuitComposition.partA),
      partB: serializeComposition(project.circuitComposition.partB),
    }),
    [project.circuitComposition]
  );

  const formItemsCircuit = useMemo(
    () => [
      { ref: "circuitNumber", label: "Número do circuito", quarter: true },
      { ref: "name", label: "Nome do SC", quarter: true },
      { ref: "phone", label: "Telefone", quarter: true },
      { ref: "email", label: "E-mail", quarter: true },
    ],
    []
  );

  const formItemsCo = useMemo(
    () => circuitMode === "single"
      ? buildEventItems("partA")
      : [...buildEventItems("partA"), { separator: true }, ...buildEventItems("partB")],
    [circuitMode]
  );

  const formItemsBr = useMemo(
    () => circuitMode === "single"
      ? buildEventItems("partA")
      : [...buildEventItems("partA"), { separator: true }, ...buildEventItems("partB")],
    [circuitMode]
  );

  const formItemsPio = useMemo(
    () => circuitMode === "single"
      ? buildEventItems("partA")
      : [...buildEventItems("partA"), { separator: true }, ...buildEventItems("partB")],
    [circuitMode]
  );

  const formItemsComposition = useMemo(
    () => {
      const partA = {
        ref: "partA",
        label: circuitMode === "single"
          ? "Composição do circuito"
          : "Composição do circuito — Parte A",
        type: "textarea",
        full: true,
        placeholder: "Uma congregação por linha",
      };
      const partB = {
        ref: "partB",
        label: "Composição do circuito — Parte B",
        type: "textarea",
        full: true,
        placeholder: "Uma congregação por linha",
      };
      return circuitMode === "single" ? [partA] : [partA, partB];
    },
    [circuitMode]
  );

  const toggleCircuitMode = () => {
    setProject((current) => {
      const nextMode = current.settings?.circuitMode === "parts" ? "single" : "parts";
      return {
        ...current,
        settings: {
          ...current.settings,
          circuitMode: nextMode,
        },
      };
    });
  };

  const updateTraveler = (nextForm) => {
    setProject((current) => ({
      ...current,
      traveler: {
        ...current.traveler,
        ...nextForm,
      },
    }));
  };

  const updateEvent = (group, nextForm) => {
    setProject((current) => {
      const next = {
        ...current,
        events: {
          ...current.events,
          [group]: {
            ...current.events[group],
            partA: { ...current.events[group].partA },
            partB: { ...current.events[group].partB },
          },
        },
      };

      Object.entries(nextForm).forEach(([path, value]) => {
        const [partKey, fieldKey] = path.split(".");
        next.events[group][partKey][fieldKey] = value;
      });

      return next;
    });
  };

  const updateComposition = (nextForm) => {
    setProject((current) => ({
      ...current,
      circuitComposition: {
        partA: "partA" in nextForm
          ? parseCompositionText(nextForm.partA)
          : current.circuitComposition.partA,
        partB: "partB" in nextForm
          ? parseCompositionText(nextForm.partB)
          : current.circuitComposition.partB,
      },
    }));
  };

  return {
    formItemsCircuit,
    formItemsCo,
    formItemsBr,
    formItemsPio,
    formItemsComposition,
    circuitMode,
    travelerRegister,
    coRegister,
    brRegister,
    pioRegister,
    compositionRegister,
    updateTraveler,
    updateEvent,
    updateComposition,
    toggleCircuitMode,
    resetSection,
  };
}
