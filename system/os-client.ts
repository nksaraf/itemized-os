export class OS {
  constructor(public supabase: any) {}
  async add_type(name: string) {
    const { data: systemType, errors } = await this.supabase
      .from("items")
      .insert([{ type: "Type" }]);

    await this.supabase.from("item_properties").insert([
      {
        id: systemType[0].id,
        name: "typeName",
        value: name,
      },
    ]);

    await this.supabase.from("references").insert([
      {
        outbound_id: "00000000-0000-0000-0000-000000000002",
        inbound_id: systemType[0].id,
        type: `Type`,
      },
    ]);

    return systemType[0].id;
  }
  async add_item(name: string) {}
  set_property() {}
  add_edge() {}
  async get_items() {
    return (await this.supabase.from("items").select("id")).data;
  }
  async get_references(id) {
    const { data } = await this.supabase
      .from("references")
      .select("*")
      .eq("outbound_id", id);
    return data.map((d) => d.inbound_id);
  }
  async get_referenced_by(id) {
    const { data } = await this.supabase
      .from("references")
      .select("*")
      .eq("inbound_id", id);
    return data.map((d) => d.outbound_id);
  }
  async get_item_types(id) {
    console.log({ id });
    const { data } = await this.supabase
      .from("references")
      .select("*")
      .eq("inbound_id", id);
    console.log({ data });
    if (!data.length) {
      return ["Type"];
    }
    const { data: types } = await this.supabase
      .from("items")
      .select("*,item_properties(*)")
      .in(
        "id",
        data.map((d) => d.outbound_id)
      )
      .eq("type", "Type");
    let system = types.map(
      (t) => t.item_properties.find((prop) => prop.name === "typeName").value
    );

    if (system.length === 1 && system[0] === "System") {
      return ["Type"];
    }
    console.log({ system });
    return system;
  }
  async get_properties(id) {
    console.log("get_properties", id);
    const {
      data: [item],
      errors,
    } = await this.supabase
      .from("items")
      .select("*,item_properties(*)")
      .eq("id", id);

    console.log({ errors });
    console.log({ item });
    if (!item) {
      return {};
    }
    console.log(
      Object.fromEntries(item.item_properties.map((pr) => [pr.name, pr.value]))
    );
    return Object.fromEntries(
      item.item_properties.map((pr) => [pr.name, pr.value])
    );
  }
  async setup() {
    console.log(
      await this.supabase
        .from("item_properties")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000")
    );
    console.log(
      await this.supabase
        .from("references")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000")
    );
    console.log(
      await this.supabase
        .from("items")
        .delete()
        .neq("id", "00000000-0000-0000-0000-000000000000")
    );

    const { data: systemType, errors } = await this.supabase
      .from("items")
      .insert([
        {
          id: "00000000-0000-0000-0000-000000000001",
          type: "Type",
        },
      ]);

    await this.supabase.from("item_properties").insert([
      {
        id: systemType[0].id,
        name: "typeName",
        value: `System`,
      },
    ]);

    await this.supabase.from("item_properties").insert([
      {
        id: "00000000-0000-0000-0000-000000000000",
        name: "name",
        value: `Bootloader`,
      },
    ]);

    const { data: baseType, errors: baseErrors } = await this.supabase
      .from("items")
      .insert([
        {
          type: "Type",
          id: "00000000-0000-0000-0000-000000000002",
        },
      ]);

    await this.supabase.from("item_properties").insert([
      {
        id: baseType[0].id,
        name: "typeName",
        value: `Type`,
      },
    ]);

    await this.supabase.from("references").insert([
      {
        outbound_id: systemType[0].id,
        inbound_id: baseType[0].id,
        type: `Type`,
      },
    ]);

    this
      .installServices
      // systemService,
      // knowledgeService,
      // bookService,
      // movieService
      ();

    return true;
  }
  async installServices(...services: any) {
    for (let service of services) {
      await service(this);
    }
  }
}
