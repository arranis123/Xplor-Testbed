export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      admin_notes: {
        Row: {
          admin_id: string | null
          created_at: string
          id: string
          is_internal: boolean | null
          note: string
          user_id: string | null
        }
        Insert: {
          admin_id?: string | null
          created_at?: string
          id?: string
          is_internal?: boolean | null
          note: string
          user_id?: string | null
        }
        Update: {
          admin_id?: string | null
          created_at?: string
          id?: string
          is_internal?: boolean | null
          note?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "admin_notes_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "admin_notes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      analytics_events: {
        Row: {
          created_at: string
          duration: number | null
          event_type: string
          id: string
          ip_address: unknown | null
          metadata: Json | null
          referrer: string | null
          session_id: string | null
          tour_id: string | null
          user_agent: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duration?: number | null
          event_type: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          referrer?: string | null
          session_id?: string | null
          tour_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duration?: number | null
          event_type?: string
          id?: string
          ip_address?: unknown | null
          metadata?: Json | null
          referrer?: string | null
          session_id?: string | null
          tour_id?: string | null
          user_agent?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "analytics_events_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "analytics_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_log: {
        Row: {
          action: string
          admin_id: string | null
          created_at: string
          id: string
          ip_address: unknown | null
          new_values: Json | null
          old_values: Json | null
          record_id: string | null
          table_name: string | null
          user_agent: string | null
        }
        Insert: {
          action: string
          admin_id?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
        }
        Update: {
          action?: string
          admin_id?: string | null
          created_at?: string
          id?: string
          ip_address?: unknown | null
          new_values?: Json | null
          old_values?: Json | null
          record_id?: string | null
          table_name?: string | null
          user_agent?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_log_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      categories: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          parent_id: string | null
          sort_order: number | null
          type: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          parent_id?: string | null
          sort_order?: number | null
          type: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          parent_id?: string | null
          sort_order?: number | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      hotel_spaces: {
        Row: {
          amenities: string[] | null
          capacity: number | null
          created_at: string
          description: string | null
          hotel_id: string | null
          id: string
          name: string
          pricing: number | null
          tour_id: string | null
          type: string | null
          updated_at: string
        }
        Insert: {
          amenities?: string[] | null
          capacity?: number | null
          created_at?: string
          description?: string | null
          hotel_id?: string | null
          id?: string
          name: string
          pricing?: number | null
          tour_id?: string | null
          type?: string | null
          updated_at?: string
        }
        Update: {
          amenities?: string[] | null
          capacity?: number | null
          created_at?: string
          description?: string | null
          hotel_id?: string | null
          id?: string
          name?: string
          pricing?: number | null
          tour_id?: string | null
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "hotel_spaces_hotel_id_fkey"
            columns: ["hotel_id"]
            isOneToOne: false
            referencedRelation: "hotels"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hotel_spaces_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      hotels: {
        Row: {
          address: string | null
          amenities: string[] | null
          brand: string | null
          contact_info: Json | null
          created_at: string
          description: string | null
          id: string
          latitude: number | null
          longitude: number | null
          name: string
          policies: string[] | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          amenities?: string[] | null
          brand?: string | null
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name: string
          policies?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          amenities?: string[] | null
          brand?: string | null
          contact_info?: Json | null
          created_at?: string
          description?: string | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          name?: string
          policies?: string[] | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "hotels_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      leads: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string | null
          metadata: Json | null
          name: string
          phone: string | null
          source: string | null
          status: string | null
          tour_id: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message?: string | null
          metadata?: Json | null
          name: string
          phone?: string | null
          source?: string | null
          status?: string | null
          tour_id?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string | null
          metadata?: Json | null
          name?: string
          phone?: string | null
          source?: string | null
          status?: string | null
          tour_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "leads_tour_id_fkey"
            columns: ["tour_id"]
            isOneToOne: false
            referencedRelation: "tours"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          account_status: Database["public"]["Enums"]["account_status"] | null
          avatar_url: string | null
          company: string | null
          created_at: string
          email: string
          email_verified: boolean | null
          first_name: string | null
          id: string
          last_login: string | null
          last_name: string | null
          phone: string | null
          storage_used: number | null
          subscription_end: string | null
          subscription_tier:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          tour_count: number | null
          updated_at: string
        }
        Insert: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          email: string
          email_verified?: boolean | null
          first_name?: string | null
          id: string
          last_login?: string | null
          last_name?: string | null
          phone?: string | null
          storage_used?: number | null
          subscription_end?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          tour_count?: number | null
          updated_at?: string
        }
        Update: {
          account_status?: Database["public"]["Enums"]["account_status"] | null
          avatar_url?: string | null
          company?: string | null
          created_at?: string
          email?: string
          email_verified?: boolean | null
          first_name?: string | null
          id?: string
          last_login?: string | null
          last_name?: string | null
          phone?: string | null
          storage_used?: number | null
          subscription_end?: string | null
          subscription_tier?:
            | Database["public"]["Enums"]["subscription_tier"]
            | null
          tour_count?: number | null
          updated_at?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          description: string | null
          key: string
          updated_at: string
          updated_by: string | null
          value: Json
        }
        Insert: {
          description?: string | null
          key: string
          updated_at?: string
          updated_by?: string | null
          value: Json
        }
        Update: {
          description?: string | null
          key?: string
          updated_at?: string
          updated_by?: string | null
          value?: Json
        }
        Relationships: [
          {
            foreignKeyName: "system_settings_updated_by_fkey"
            columns: ["updated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tours: {
        Row: {
          address: string | null
          approved_at: string | null
          approved_by: string | null
          created_at: string
          description: string | null
          dwell_time_avg: number | null
          id: string
          is_featured: boolean | null
          latitude: number | null
          lead_count: number | null
          longitude: number | null
          metadata: Json | null
          pricing: number | null
          property_type: Database["public"]["Enums"]["property_type"] | null
          region: string | null
          share_count: number | null
          status: Database["public"]["Enums"]["tour_status"] | null
          storage_size: number | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          user_id: string | null
          view_count: number | null
          vr_link: string | null
        }
        Insert: {
          address?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          dwell_time_avg?: number | null
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          lead_count?: number | null
          longitude?: number | null
          metadata?: Json | null
          pricing?: number | null
          property_type?: Database["public"]["Enums"]["property_type"] | null
          region?: string | null
          share_count?: number | null
          status?: Database["public"]["Enums"]["tour_status"] | null
          storage_size?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          user_id?: string | null
          view_count?: number | null
          vr_link?: string | null
        }
        Update: {
          address?: string | null
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
          description?: string | null
          dwell_time_avg?: number | null
          id?: string
          is_featured?: boolean | null
          latitude?: number | null
          lead_count?: number | null
          longitude?: number | null
          metadata?: Json | null
          pricing?: number | null
          property_type?: Database["public"]["Enums"]["property_type"] | null
          region?: string | null
          share_count?: number | null
          status?: Database["public"]["Enums"]["tour_status"] | null
          storage_size?: number | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          user_id?: string | null
          view_count?: number | null
          vr_link?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tours_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tours_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          assigned_at: string | null
          assigned_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string | null
        }
        Insert: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Update: {
          assigned_at?: string | null
          assigned_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_assigned_by_fkey"
            columns: ["assigned_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _user_id: string
          _role: Database["public"]["Enums"]["app_role"]
        }
        Returns: boolean
      }
      is_admin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      account_status: "active" | "suspended" | "banned" | "pending_verification"
      app_role: "admin" | "moderator" | "creator" | "user"
      property_type:
        | "hotel"
        | "vacation_rental"
        | "commercial"
        | "residential"
        | "event_venue"
        | "restaurant"
      subscription_tier: "free" | "basic" | "premium" | "enterprise"
      tour_status:
        | "draft"
        | "pending_approval"
        | "published"
        | "flagged"
        | "archived"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      account_status: ["active", "suspended", "banned", "pending_verification"],
      app_role: ["admin", "moderator", "creator", "user"],
      property_type: [
        "hotel",
        "vacation_rental",
        "commercial",
        "residential",
        "event_venue",
        "restaurant",
      ],
      subscription_tier: ["free", "basic", "premium", "enterprise"],
      tour_status: [
        "draft",
        "pending_approval",
        "published",
        "flagged",
        "archived",
      ],
    },
  },
} as const
